document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('videoCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!carousel || !prevBtn || !nextBtn) return;

  // Centralized Video Data Array
  const videosData = [
    {
      title: "Diagnosis & First Steps",
      src: "https://media.thephoenixproject4k.com/DiagnosisVid_compressed2.mp4",
      poster: "Images/DiagnosisVid_Thumbnail.jpg",
      caption: "A direct look into the platform's vision, journey, and where it all started."
    },
    {
      title: "Treatment Update",
      src: "https://media.thephoenixproject4k.com/PostBiopsyThoughts.mp4",
      poster: "Images/PostBiopsyThumb_Full_withText.JPG",
      caption: "My Post-Biopsy Thoughts."
    },
    {
      title: "Milestones & Reflections",
      src: "https://media.thephoenixproject4k.com/PostChemo1_24hours_WithText.mp4",
      poster: "Images/PostChemo1_24hourslater.jpg",
      caption: "How I'm feeling 24 hours after my first chemo treatment."
    },
    {
      title: "Milestones & Reflections",
      src: "https://media.thephoenixproject4k.com/OneWeekPostACTreatment1.mp4",
      poster: "Images/Week_1_afterTreatment_1_withText.jpg",
      caption: "One Week Later: Post AC Treatment #1."
    }
  ];

  // Render Video Slides Dynamically
  carousel.innerHTML = videosData.map(video => `
    <div class="carousel-slide">
      <h3>${video.title}</h3>
      <div class="video-container">
        <video controls preload="metadata" playsinline poster="${video.poster}">
          <source src="${video.src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <p class="media-caption">${video.caption}</p>
    </div>
  `).join('');

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