// 페이지 전환 애니메이션
(function() {
  'use strict';

  // 전환 오버레이 생성
  const emojisByPage = {
    'library': ['🏛️', '📚'],
    'schedule': ['✒️', '📑'],
    'community': ['📰', '💡'],
    'myspace': ['🎓', '🪶'],
    'home': ['📖', '☕'],
    'default': ['📖', '📕', '📗', '📘', '📙', '📚']
  };
  
  const overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';
  document.body.appendChild(overlay);
  
  function getEmojiForLink(href) {
    let emojis = emojisByPage.default;
    
    if (href.includes('library.html')) {
      emojis = emojisByPage.library;
    } else if (href.includes('schedule.html')) {
      emojis = emojisByPage.schedule;
    } else if (href.includes('community.html')) {
      emojis = emojisByPage.community;
    } else if (href.includes('myspace.html')) {
      emojis = emojisByPage.myspace;
    } else if (href.includes('index.html') || href.endsWith('/') || href.includes('?from=internal')) {
      emojis = emojisByPage.home;
    }
    
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  // 페이지 로드 시 fade-in
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.body.classList.add('page-ready');
    }, 50);
  });

  // 페이지 내부 링크 클릭 시 오버레이 표시 후 이동
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    // 새 탭, 외부 링크, 앵커 링크 제외
    if (link.target === '_blank' || 
        link.hostname !== window.location.hostname ||
        (link.href.includes('#') && link.href.split('#')[0] === window.location.href.split('#')[0])) {
      return;
    }

    e.preventDefault();
    const href = link.href;
    
    // 페이지별 이모지로 오버레이 표시
    overlay.innerHTML = '<div class="book-flip">' + getEmojiForLink(href) + '</div>';
    overlay.classList.add('active');
    document.body.classList.remove('page-ready');
    
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  });

  // 뒤로가기 시 자연스럽게
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      document.body.classList.add('page-ready');
      overlay.classList.remove('active');
    }
  });
})();
