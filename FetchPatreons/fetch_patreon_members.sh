#!/bin/bash
# filepath: fetch_patreon_members.sh

set -e

# Check for required environment variable
if [ -z "$PATREON_ACCESS_TOKEN" ]; then
    echo "Error: PATREON_ACCESS_TOKEN environment variable is not set"
    echo "Usage: export PATREON_ACCESS_TOKEN='your_token_here' && ./fetch_patreon_members.sh"
    exit 1
fi

# Get campaign ID first (you'll need to get your campaign ID)
# If you know your campaign ID, you can hardcode it here
CAMPAIGN_ID="${PATREON_CAMPAIGN_ID:-}"

if [ -z "$CAMPAIGN_ID" ]; then
    echo "Fetching campaign ID..."
    CAMPAIGN_RESPONSE=$(curl -s -X GET \
        "https://www.patreon.com/api/oauth2/v2/campaigns" \
        -H "Authorization: Bearer $PATREON_ACCESS_TOKEN" \
        -H "Content-Type: application/json")
    
    CAMPAIGN_ID=$(echo "$CAMPAIGN_RESPONSE" | jq -r '.data[0].id')
    
    if [ -z "$CAMPAIGN_ID" ] || [ "$CAMPAIGN_ID" = "null" ]; then
        echo "Error: Could not fetch campaign ID"
        echo "Response: $CAMPAIGN_RESPONSE"
        exit 1
    fi
    
    echo "Campaign ID: $CAMPAIGN_ID"
fi

# Fetch members with pagination support
OUTPUT_FILE="website/_data/patreons.json"
TEMP_FILE=$(mktemp)
ALL_MEMBERS="[]"
NEXT_CURSOR=""

echo "Fetching Patreon members..."

while true; do
    # Build the URL with cursor for pagination
    if [ -z "$NEXT_CURSOR" ]; then
        URL="https://www.patreon.com/api/oauth2/v2/campaigns/${CAMPAIGN_ID}/members?include=currently_entitled_tiers,user&fields%5Bmember%5D=full_name,patron_status&fields%5Btier%5D=title&fields%5Buser%5D=full_name,url"
    else
        URL="https://www.patreon.com/api/oauth2/v2/campaigns/${CAMPAIGN_ID}/members?include=currently_entitled_tiers,user&fields%5Bmember%5D=full_name,patron_status&fields%5Btier%5D=title&fields%5Buser%5D=full_name,url&page%5Bcursor%5D=${NEXT_CURSOR}"
    fi
    
    RESPONSE=$(curl -s -X GET "$URL" \
        -H "Authorization: Bearer $PATREON_ACCESS_TOKEN" \
        -H "Content-Type: application/json")
    
    # Check for errors
    if echo "$RESPONSE" | jq -e '.errors' > /dev/null 2>&1; then
        echo "Error from API:"
        echo "$RESPONSE" | jq '.errors'
        exit 1
    fi
    
    # Process the response
    echo "$RESPONSE" > "$TEMP_FILE"
    
    # Extract members from this page
    PAGE_MEMBERS=$(jq '[
        .data[] | 
        . as $member |
        {
            member_id: .id,
            name: (.attributes.full_name // ""),
            tier_id: (.relationships.currently_entitled_tiers.data[0].id // ""),
            patron_status: .attributes.patron_status
        }
    ]' "$TEMP_FILE")
    
    # Extract included data (tiers and users)
    INCLUDED=$(jq '.included // []' "$TEMP_FILE")
    
    # Simplified merge - include all patrons with active status, excluding free tier
    PAGE_RESULT=$(jq -n \
        --argjson members "$PAGE_MEMBERS" \
        --argjson included "$INCLUDED" \
        '$members | map(
            . as $m |
            ($included[] | select(.type == "tier" and .id == $m.tier_id)) as $tier |
            {
                name: $m.name,
                tier: ($tier.attributes.title // "Unknown"),
                active: ($m.patron_status == "active_patron")
            }
        ) | map(select(.tier != "Unknown" and .tier != "" and .tier != "Free")) | sort_by(.tier) | reverse')
    
    # Merge with all members
    ALL_MEMBERS=$(jq -n \
        --argjson all "$ALL_MEMBERS" \
        --argjson page "$PAGE_RESULT" \
        '$all + $page')
    
    echo "Fetched $(echo "$PAGE_RESULT" | jq 'length') members..."
    
    # Check for next page
    NEXT_CURSOR=$(jq -r '.meta.pagination.cursors.next // ""' "$TEMP_FILE")
    
    if [ -z "$NEXT_CURSOR" ] || [ "$NEXT_CURSOR" = "null" ]; then
        break
    fi
done

# Merge with existing data to preserve custom fields and historical data
if [ -f "$OUTPUT_FILE" ]; then
    echo "Merging with existing data to preserve custom fields and historical patrons..."
    EXISTING_DATA=$(cat "$OUTPUT_FILE")
    
    # Merge strategy:
    # 1. Update existing members with new data from API (name, tier, active status)
    # 2. Keep old members that aren't in the new data (they've left but we keep them for history)
    # 3. Add new members from API
    # 4. Preserve custom fields like 'url' from existing data
    MERGED_DATA=$(jq -n \
        --argjson new "$ALL_MEMBERS" \
        --argjson old "$EXISTING_DATA" \
        '
        # Create lookup maps
        ($new | map({(.name): .}) | add) as $newMap |
        ($old | map({(.name): .}) | add) as $oldMap |
        
        # Get all unique names from both old and new
        (($new | map(.name)) + ($old | map(.name)) | unique) as $allNames |
        
        # For each name, merge appropriately
        $allNames | map(
            . as $name |
            if $newMap[$name] and $oldMap[$name] then
                # Member exists in both - merge, keeping custom fields from old but updating tier/active from new
                $oldMap[$name] + $newMap[$name]
            elif $newMap[$name] then
                # New member - use from API
                $newMap[$name]
            else
                # Old member not in new data - keep as is (they left but we preserve history)
                $oldMap[$name]
            end
        )
        ')
    
    echo "$MERGED_DATA" | jq '.' > "$OUTPUT_FILE"
else
    # No existing file, just save new data
    echo "$ALL_MEMBERS" | jq '.' > "$OUTPUT_FILE"
fi

echo "Successfully saved $(jq 'length' "$OUTPUT_FILE") patrons to $OUTPUT_FILE"

# Clean up
rm -f "$TEMP_FILE"