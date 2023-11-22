/**
 * Performs the initialization of the community feeds for the home page.
 */
async function initialize_community_feeds() {
    await get_latest_news();
    await get_latest_community();
}

/**
 * Gets the latest news posts from the monogame discourse and injects
 * it into the #latest-community element on the page
 */
async function get_latest_news() {
    let response = await fetch('https://community.monogame.net/latest-news');
    let json = await response.json();

    if (json.topic_list.topics != undefined) {
        let latestNewsContainer = document.getElementById("latest-news");

        for (let i = 0; i < json.topic_list.topics.length; i++) {
            let news = json.topic_list.topics[i];
            let latestNewsWrapper = document.createElement('div');
            latestNewsWrapper.className = 'col-12 mb-3';
            latestNewsWrapper.appendChild(create_post_block(news));
            latestNewsContainer.appendChild(latestNewsWrapper);
        }
    }
}

/**
 * Gets the latest community posts from the monogame discourse and injects
 * it into the #latest-community element on the page
 */
async function get_latest_community() {
    let response = await fetch('https://community.monogame.net/latest-community');
    let json = await response.json();

    if (json.topic_list.topics != undefined) {
        let latestCommunity = document.getElementById("latest-community");

        //  Only show most recent 6 posts
        let count = 0;
        for (let i = 0; i < json.topic_list.topics.length && count < 5; i++) {
            let post = json.topic_list.topics[i];

            //  if the category_id of hte post is 27, that means it's a 
            //  news post, ignore these here, only do community posts
            if (post.category_id === 27) { continue; }
            count++;
            let latestCommunityWrapper = document.createElement('div');
            latestCommunityWrapper.className = 'col-12 mb-3 pe-4';
            latestCommunityWrapper.appendChild(create_post_block(post));
            latestCommunity.appendChild(latestCommunityWrapper);
        }
    }
}

/**
 * Calculates the difference between two given dates and returns
 * back a string in the format of "x [unit] ago" where x is the
 * difference and [unit] is either "year(s)", "month(s)", "day(s)",
 * "hour(s)", or "minute(s)".
 * If the difference is less than a minute then "Just Now" is returned.
 * 
 * @param {Date} today The current date and time
 * @param {Date} other The date and time of the other date
 * @returns 
 */
function get_last_update(today, other) {
    if (today.getFullYear() !== other.getFullYear()) {
        let numYears = today.getFullYear() - other.getFullYear();
        let unit = numYears === 1 ? 'yr' : 'yrs'
        return `${numYears}${unit} ago`;
    }

    if (today.getMonth() !== other.getMonth()) {
        let numMonths = today.getMonth() - other.getMonth();
        return `${numMonths}m ago`;
    }

    if (today.getDate() !== other.getDate()) {
        let numDays = today.getDate() - other.getDate();
        return `${numDays}d  ago`;
    }

    if (today.getHours() !== other.getHours()) {
        let numHours = today.getHours() - other.getHours();
        let unit = numHours === 1 ? 'hr' : 'hrs';
        return `${numHours}${unit} ago`;
    }


    if (today.getMinutes() !== other.getMinutes()) {
        let numMinutes = today.getMinutes() - other.getMinutes();
        let unit = numMinutes === 1 ? 'min' : 'mins';
        return `${numMinutes} ${unit} ago`;
    }

    return `Just Now`
}

/**
 * Builds an HtmlDivElement that contains the div of the post block to
 * add to the page for the post given.
 * 
 * @param {*} post Discourse API Topic JSON object.
 * @returns The HtmlDivElement that is built by this method
 */
function create_post_block(post) {
    let today = new Date();
    let postDate = new Date(post.created_at);
    let lastUpdate = get_last_update(today, postDate);
    //  reply_count only counts if the user hit reply directly to the post
    //  posts_count is the total number of posts in the topic, including the original
    //  post, so we -1 to get an accurate reply count
    let replyCount = Intl.NumberFormat('en-US', {notation: 'compact', maximumFractionDigits: 1}).format(post.posts_count - 1);
    let viewCount = Intl.NumberFormat('en-US', {notation: 'compact', maximumFractionDigits: 1}).format(post.views);
    let likeCount = Intl.NumberFormat('en-US', {notation: 'compact', maximumFractionDigits: 1}).format(post.like_count);

    let postRoot = document.createElement('div');
    postRoot.className = 'overflow-hidden mb-4 h-100 position-relative';


    let postWrapper = document.createElement('div');
    postWrapper.className = 'col d-flex flex-column';
    postRoot.appendChild(postWrapper);

    let postTitleLink = document.createElement('a');
    postTitleLink.setAttribute('href', `https://community.monogame.net/t/${post.slug}`);
    postTitleLink.appendChild(document.createTextNode(post.title));
    let postTitle = document.createElement('h5');
    postTitle.className = '';
    postTitle.appendChild(postTitleLink);
    postWrapper.appendChild(postTitle);

    let postExcerpt = document.createElement('p');
    postExcerpt.className = 'card-text mb-auto';
    if (post.excerpt !== undefined) {
        postExcerpt.innerHTML = post.excerpt;
    }
    postWrapper.appendChild(postExcerpt);

    let postFooter = document.createElement('div');
    postFooter.className = 'text-body-secondary d-flex flex-row justify-content-between post-statistics';
    let lastUpdateBlock = document.createElement('div');
    lastUpdateBlock.innerHTML = `<i class="bi bi-calendar"></i> ${lastUpdate}`;
    let replyCountBlock = document.createElement('div');
    replyCountBlock.innerHTML = `<i class="bi bi-reply"></i> ${replyCount}`;
    let viewCountBlock = document.createElement('div');
    viewCountBlock.innerHTML = `<i class="bi bi-eye"></i> ${viewCount}`
    let likeCountBlock = document.createElement('div');
    likeCountBlock.innerHTML = ` <i class="bi bi-heart-fill"></i> ${likeCount}`;
    postFooter.appendChild(lastUpdateBlock);
    postFooter.appendChild(replyCountBlock);
    postFooter.appendChild(viewCountBlock);
    postFooter.appendChild(likeCountBlock);
    postWrapper.appendChild(postFooter);

    return postRoot;
}

initialize_community_feeds();