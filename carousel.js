document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('videoCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!carousel || !prevBtn || !nextBtn) return;

  let isTransitioning = false;

  // Touch Tracking Variables
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 40; // Minimum drag distance in pixels to count as a swipe

  const pauseAllVideos = () => {
    const videos = carousel.querySelectorAll('video');
    videos.forEach(video => {
      if (!video.paused) {
        video.pause();
      }
    });
  };

  const slideNext = () => {
    if (isTransitioning) return;
    pauseAllVideos();

    const slides = carousel.querySelectorAll('.carousel-slide');
    if (slides.length <= 1) return;

    isTransitioning = true;

    // Append first slide to the end so it sits immediately to the right
    carousel.appendChild(slides[0]);

    // Keep visual position fixed while DOM shifts
    carousel.scrollLeft -= carousel.clientWidth;

    // Smoothly slide forward by 1 card width
    carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });

    setTimeout(() => {
      isTransitioning = false;
    }, 400); // Matches smooth scroll duration
  };

  const slidePrev = () => {
    if (isTransitioning) return;
    pauseAllVideos();

    const slides = carousel.querySelectorAll('.carousel-slide');
    if (slides.length <= 1) return;

    isTransitioning = true;

    // Move last slide to the front so it sits immediately to the left
    const lastSlide = slides[slides.length - 1];
    carousel.insertBefore(lastSlide, slides[0]);

    // Keep visual position fixed while DOM shifts
    carousel.scrollLeft += carousel.clientWidth;

    // Smoothly slide backward by 1 card width
    carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' });

    setTimeout(() => {
      isTransitioning = false;
    }, 400);
  };

  // Event Listeners for Buttons
  nextBtn.addEventListener('click', slideNext);
  prevBtn.addEventListener('click', slidePrev);

  // Touch Event Listeners for Mobile Swipe
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const swipeDistance = touchEndX - touchStartX;

    // Swiped Left -> Move Next
    if (swipeDistance < -minSwipeDistance) {
      slideNext();
    }
    // Swiped Right -> Move Prev
    else if (swipeDistance > minSwipeDistance) {
      slidePrev();
    }
  };

  // Safety pause if video scrolls manually
  carousel.addEventListener('scroll', () => {
    pauseAllVideos();
  }, { passive: true });
});