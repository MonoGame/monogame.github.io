(() => {
    'use strict';

    class ResourceTagFilter {
        constructor() {
            this.container = document.getElementById('resource-gallery');
            this.items = this.container ? Array.from(this.container.children) : [];
            this.selectedTags = new Set();
            
            this.init();
        }

        init() {
            if (!this.container) {
                console.warn('Resource gallery not found');
                return;
            }

            this.bindEvents();
                        
            this.updateDisplay();
            this.updateFilterStatus();
        }

        getItemTags(item) {
            // Resources use data-tags attribute
            if (item.dataset.tags) {
                return item.dataset.tags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag);
            }
            return [];
        }

        bindEvents() {
            // Tag filter buttons
            const tagButtons = document.querySelectorAll('.tag-filter-btn');
            tagButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleTagClick(e));
            });

            // Clear all button
            const clearButton = document.getElementById('clear-filters');
            if (clearButton) {
                clearButton.addEventListener('click', () => this.clearAllFilters());
            }

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.target.classList.contains('tag-filter-btn')) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.handleTagClick(e);
                    }
                }
            });
        }

        handleTagClick(event) {
            const button = event.target;
            const tag = button.dataset.tag.toLowerCase();
            
            // Handle multi-select with Shift key
            if (event.shiftKey) {
                this.toggleTag(tag, button);
            } else {
                this.clearAllFilters();
                this.toggleTag(tag, button);
            }
            
            this.updateDisplay();
            this.updateFilterStatus();
        }

        toggleTag(tag, button) {
            if (this.selectedTags.has(tag)) {
                this.selectedTags.delete(tag);
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            } else {
                this.selectedTags.add(tag);
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
            }
            
            // Remove focus to prevent button from appearing highlighted after click
            button.blur();
        }

        clearAllFilters() {
            this.selectedTags.clear();
            const tagButtons = document.querySelectorAll('.tag-filter-btn');
            tagButtons.forEach(button => {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            });
            this.updateDisplay();
            this.updateFilterStatus();
        }

        updateDisplay() {
            let visibleCount = 0;
            
            this.items.forEach(item => {
                const itemTags = this.getItemTags(item);
                const shouldShow = this.shouldShowItem(itemTags);
                
                if (shouldShow) {
                    item.style.display = '';
                    item.classList.remove('d-none');
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                    item.classList.add('d-none');
                }
            });
        }

        shouldShowItem(itemTags) {
            // If no tags selected show all
            if (this.selectedTags.size === 0) {
                return true;
            }

            // Check if item has ALL of the selected tags
            return Array.from(this.selectedTags).every(selectedTag => 
                itemTags.some(itemTag => itemTag === selectedTag)
            );
        }

        updateFilterStatus() {
            const resultsCountElement = document.getElementById('results-count');
            const activeFiltersElement = document.getElementById('active-filters');
            
            if (resultsCountElement) {
                const visibleCount = this.items.filter(item => 
                    !item.classList.contains('d-none') && item.style.display !== 'none'
                ).length;
                
                resultsCountElement.textContent = 
                    visibleCount === this.items.length 
                        ? 'All results' 
                        : `${visibleCount} of ${this.items.length} results`;
            }
            
            if (activeFiltersElement) {
                if (this.selectedTags.size === 0) {
                    activeFiltersElement.textContent = 'No filters active';
                } else if (this.selectedTags.size === 1) {
                    const tagList = Array.from(this.selectedTags).join(', ');
                    activeFiltersElement.textContent = `Showing: ${tagList}`;
                } else {
                    const tagList = Array.from(this.selectedTags).join(' + ');
                    activeFiltersElement.textContent = `Showing items with ALL: ${tagList}`;
                }
            }
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const resourceGallery = document.getElementById('resource-gallery');
        if (resourceGallery) {
            new ResourceTagFilter();
        }
    });
})();