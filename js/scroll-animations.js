// ========================================
// SCROLL ANIMATIONS
// 스크롤 시 요소가 나타나는 애니메이션
// ========================================

(() => {
  // Intersection Observer 설정
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // 애니메이션 콜백
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        // 한 번 나타난 후에는 관찰 중지 (선택사항)
        // observer.unobserve(entry.target);
      }
    });
  };

  // Observer 생성
  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // 애니메이션을 적용할 요소들 선택
  const animateElements = document.querySelectorAll('.fade-in-on-scroll');
  
  // 각 요소 관찰 시작
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // 접근성: 사용자가 애니메이션 줄이기를 선호하면 즉시 표시
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animateElements.forEach(el => {
      el.classList.add('fade-in-visible');
    });
  }
})();

// ========================================
// 패럴랙스 효과 (히어로 섹션 배경)
// ========================================

(() => {
  const hero = document.querySelector('.intro-hero');
  if (!hero) return;

  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    // 배경 이미지를 천천히 이동
    hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
    
    ticking = false;
  };

  const requestParallaxUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  // 스크롤 이벤트 리스너
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

  // 접근성: 애니메이션 줄이기 설정 시 패럴랙스 비활성화
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.removeEventListener('scroll', requestParallaxUpdate);
  }
})();
