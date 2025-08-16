(() => {
    'use strict';

    function createNewsCarousel(element, type = 'Default') {
        const carousel = {
            element: element,
            type: type,
            track: element.querySelector(`#newsTrack${type}`),
            dotsContainer: element.querySelector(`#newsCarouselDots${type}`),
            prevBtn: element.querySelector(`#newsPrevBtn${type}`),
            nextBtn: element.querySelector(`#newsNextBtn${type}`),
            slides: element.querySelectorAll('.news-slide'),
            currentSlide: 0,
            autoPlayInterval: null,
            autoPlayDelay: 5000,
            isAnimating: false
        };

        function init() {
            if (carousel.slides.length === 0) {
                console.warn('No news slides found');
                return;
            }

            createDots();
            bindEvents();
            startAutoPlay();
            updateActiveStates();
        }

        function createDots() {
            if (!carousel.dotsContainer) return;

            carousel.dotsContainer.innerHTML = '';

            carousel.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `news-carousel-dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                carousel.dotsContainer.appendChild(dot);
            });
        }

        function bindEvents() {
            // Navigation buttons
            if (carousel.prevBtn) {
                carousel.prevBtn.addEventListener('click', () => previousSlide());
            }

            if (carousel.nextBtn) {
                carousel.nextBtn.addEventListener('click', () => nextSlide());
            }

            // Slide click handlers
            carousel.slides.forEach((slide) => {
                slide.addEventListener('click', (e) => {
                    // Don't navigate if clicking on the "Read More" link
                    if (!e.target.closest('.news-read-more')) {
                        const url = slide.getAttribute('data-url');
                        if (url) {
                            window.location.href = url;
                        }
                    }
                });
            });

            // Pause auto-play on hover
            carousel.element.addEventListener('mouseenter', () => stopAutoPlay());
            carousel.element.addEventListener('mouseleave', () => startAutoPlay());

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                // Only handle keys if the carousel is in focus or visible
                if (isInViewport()) {
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        previousSlide();
                    }
                    if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        nextSlide();
                    }
                }
            });

            // Touch/swipe support
            addTouchSupport();
        }

        function addTouchSupport() {
            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;

            carousel.element.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: true });

            carousel.element.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
                handleSwipe(startX, startY, endX, endY);
            }, { passive: true });
        }

        function handleSwipe(startX, startY, endX, endY) {
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const minSwipeDistance = 50;

            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    previousSlide();
                } else {
                    nextSlide();
                }
            }
        }

        function isInViewport() {
            const rect = carousel.element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function goToSlide(index) {
            if (carousel.isAnimating || index === carousel.currentSlide || index < 0 || index >= carousel.slides.length) {
                return;
            }

            carousel.isAnimating = true;
            carousel.currentSlide = index;

            const translateX = -index * 100;
            carousel.track.style.transform = `translateX(${translateX}%)`;

            updateActiveStates();
            restartAutoPlay();

            // Reset animation flag after transition
            setTimeout(() => {
                carousel.isAnimating = false;
            }, 600);
        }

        function updateActiveStates() {
            // Update dots
            if (carousel.dotsContainer) {
                carousel.dotsContainer.querySelectorAll('.news-carousel-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === carousel.currentSlide);
                });
            }
        }

        function nextSlide() {
            const nextIndex = (carousel.currentSlide + 1) % carousel.slides.length;
            goToSlide(nextIndex);
        }

        function previousSlide() {
            const prevIndex = carousel.currentSlide === 0 ? carousel.slides.length - 1 : carousel.currentSlide - 1;
            goToSlide(prevIndex);
        }

        function startAutoPlay() {
            if (carousel.slides.length <= 1) return;

            stopAutoPlay();
            carousel.autoPlayInterval = setInterval(() => {
                nextSlide();
            }, carousel.autoPlayDelay);
        }

        function stopAutoPlay() {
            if (carousel.autoPlayInterval) {
                clearInterval(carousel.autoPlayInterval);
                carousel.autoPlayInterval = null;
            }
        }

        function restartAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        function destroy() {
            stopAutoPlay();
        }

        init();

        return {
            goToSlide,
            nextSlide,
            previousSlide,
            destroy
        };
    }

    // Initialize both desktop and mobile carousels when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Desktop carousel (overlay)
        const desktopCarouselElement = document.getElementById('newsCarouselDesktop');
        if (desktopCarouselElement) {
            createNewsCarousel(desktopCarouselElement, 'Desktop');
        }

        // Mobile carousel (separate section)
        const mobileCarouselElement = document.getElementById('newsCarouselMobile');
        if (mobileCarouselElement) {
            createNewsCarousel(mobileCarouselElement, 'Mobile');
        }
    });
})();
