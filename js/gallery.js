document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const playToggle = document.getElementById('playToggle');
  const playIcon = playToggle.querySelector('.play-icon');
  const pauseIcon = playToggle.querySelector('.pause-icon');
  
  let currentSlide = 0;
  let isAutoPlay = true;
  let autoPlayInterval;
  
  // Initialize carousel
  function init() {
    showSlide(0);
    startAutoPlay();
  }
  
  // Show specific slide
  function showSlide(index) {
    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
        slide.style.transform = 'translateX(0)';
      } else if (i < index) {
        slide.style.transform = 'translateX(-100%)';
      } else {
        slide.style.transform = 'translateX(100%)';
      }
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
      if (i === index) {
        indicator.classList.remove('bg-white/50');
        indicator.classList.add('bg-white');
      } else {
        indicator.classList.remove('bg-white');
        indicator.classList.add('bg-white/50');
      }
    });
    
    currentSlide = index;
  }
  
  // Next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
  
  // Previous slide
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }
  
  // Start auto-play
  function startAutoPlay() {
    if (isAutoPlay) {
      autoPlayInterval = setInterval(nextSlide, 5000);
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    }
  }
  
  // Stop auto-play
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    isAutoPlay = false;
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
  }
  
  // Toggle auto-play
  function toggleAutoPlay() {
    if (isAutoPlay) {
      stopAutoPlay();
    } else {
      isAutoPlay = true;
      startAutoPlay();
    }
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    if (isAutoPlay) {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    if (isAutoPlay) {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }
  });
  
  playToggle.addEventListener('click', toggleAutoPlay);
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      if (isAutoPlay) {
        clearInterval(autoPlayInterval);
        startAutoPlay();
      }
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === ' ') {
      e.preventDefault();
      toggleAutoPlay();
    }
  });
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  const carousel = document.getElementById('carousel');
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      
      if (isAutoPlay) {
        clearInterval(autoPlayInterval);
        startAutoPlay();
      }
    }
  }
  
  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    if (isAutoPlay) {
      clearInterval(autoPlayInterval);
    }
  });
  
  carousel.addEventListener('mouseleave', () => {
    if (isAutoPlay) {
      startAutoPlay();
    }
  });
  
  // Initialize
  init();
  
  console.log('🎠 Carousel Gallery initialized successfully');
});
