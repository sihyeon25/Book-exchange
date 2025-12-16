// 라이브러리 페이지 검색/필터/정렬/즐겨찾기 구현

// 즐겨찾기 로컬 저장소
function getFavorites(){
  try{
    if(!window.localStorage) {
      console.warn('localStorage를 사용할 수 없습니다.');
      return [];
    }
    return JSON.parse(localStorage.getItem('favorites')||'[]');
  }catch(e){
    console.error('즐겨찾기 데이터 읽기 실패:', e);
    return [];
  }
}
function toggleFavorite(id){
  try{
    if(!window.localStorage) {
      alert('브라우저 설정에서 로컬 저장소가 비활성화되어 있습니다.\n즐겨찾기 기능을 사용하려면 브라우저 설정을 확인해주세요.');
      return;
    }
    const favs = getFavorites();
    const idx = favs.indexOf(id);
    if(idx>=0) favs.splice(idx,1);
    else favs.push(id);
    localStorage.setItem('favorites',JSON.stringify(favs));
    renderLibrary();
  }catch(e){
    console.error('즐겨찾기 저장 실패:', e);
    alert('즐겨찾기 저장에 실패했습니다. 브라우저의 저장 공간을 확인해주세요.');
  }
}
function isFavorite(id){
  return getFavorites().includes(id);
}

// 필터/정렬 상태
let currentSearch = '';
let currentTag = '';
let currentSort = 'title';
let favOnly = false;

// 전체 태그 모음
function getAllTags(){
  const tags = new Set();
  books.forEach(b => (b.tags||[]).forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

// 필터링된 책 목록
function getFilteredBooks(){
  let list = books.slice();
  
  // 검색
  if(currentSearch){
    const q = currentSearch.toLowerCase();
    list = list.filter(b => 
      b.title.toLowerCase().includes(q) || 
      b.author.toLowerCase().includes(q) ||
      (b.selectedBy && b.selectedBy.toLowerCase().includes(q))
    );
  }
  
  // 태그 필터
  if(currentTag){
    list = list.filter(b => (b.tags||[]).includes(currentTag));
  }
  
  // 즐겨찾기만
  if(favOnly){
    const favs = getFavorites();
    list = list.filter(b => favs.includes(b.id));
  }
  
  // 정렬
  if(currentSort==='rating'){
    list.sort((a,b) => computeAverageRating(b) - computeAverageRating(a));
  }else{
    list.sort((a,b) => a.title.localeCompare(b.title,'ko'));
  }
  
  return list;
}

// 렌더링
function renderLibrary(){
  const listEl = document.getElementById('bookList');
  const list = getFilteredBooks();
  
  if(!list.length){
    listEl.innerHTML = '<p class="muted" style="text-align:center;margin:2rem 0">검색 결과가 없어요.</p>';
    return;
  }
  
  // 읽는중/완독 분류
  const reading = list.filter(b => b.status === 'reading');
  const completed = list.filter(b => !reading.includes(b));
  
  let html = '';
  if(reading.length){
    html += '<section class="library-section"><h2 class="section-title">읽는 중</h2><div class="library-shelf">';
    reading.forEach(b => { html += renderBookSpine(b,'reading') });
    html += '</div></section>';
  }
  if(completed.length){
    html += '<section class="library-section"><h2 class="section-title">완독</h2><div class="library-shelf">';
    completed.forEach(b => { html += renderBookSpine(b,'completed') });
    html += '</div></section>';
  }
  
  listEl.innerHTML = html;
  
  // 책등 클릭 이벤트
  document.querySelectorAll('.library-book-spine').forEach(spine => {
    const id = spine.dataset.bookId;
    spine.addEventListener('click', () => location.href = `book-detail.html?id=${id}`);
  });
  
  // 즐겨찾기 버튼
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.id);
    });
  });
}

function renderBookSpine(b, status){
  const backgroundStyle = b.cover 
    ? `background-image: url('${b.cover}'); background-size: cover; background-position: center;`
    : 'background: linear-gradient(135deg, #8B7355 0%, #6B5845 100%);';
  
  const textColor = b.textColor || '#FFFFFF';
  
  return `
    <div class="library-book-spine" data-book-id="${b.id}" style="${backgroundStyle}">
      <div class="spine-face">
        <span class="spine-title" style="color: ${textColor}; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">${b.title}</span>
        <span class="spine-author" style="color: ${textColor}; opacity: 0.9; text-shadow: 0 1px 6px rgba(0,0,0,0.5);">${b.author}</span>
      </div>
      <div class="book-cover-preview">
        ${b.cover ? `<img src="${b.cover}" alt="${b.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22180%22%3E%3Crect fill=%22%23f0e6d2%22 width=%22120%22 height=%22180%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 font-size=%2240%22%3E📚%3C/text%3E%3C/svg%3E';">` : '<div class="no-cover">📚</div>'}
      </div>
    </div>
  `;
}

function renderBookCard(b, status){
  const fav = isFavorite(b.id);
  const avg = computeAverageRating(b);
  const heart = fav ? '❤️' : '🤍';
  const statusLabel = status==='reading'?'읽는 중':'완독';
  const statusClass = status==='reading'?'reading':'completed';
  
  // 멤버별 색상 하트
  const memberHearts = {
    '시현': '💙',
    '태이': '🩷',
    '희수': '💚',
    '지원': '💜'
  };
  const selectedHeart = b.selectedBy ? memberHearts[b.selectedBy] || '📚' : '📚';
  const selectedBy = b.selectedBy ? `<div style="margin-top:.3rem;font-size:.75rem;color:var(--spine);opacity:.8">${selectedHeart} ${b.selectedBy} 추천</div>` : '';
  
  // 책 표지 이미지 (에러 처리 포함)
  const coverImg = b.cover ? 
    `<img src="${b.cover}" alt="${b.title} 표지" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22300%22%3E%3Crect fill=%22%23f0e6d2%22 width=%22200%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 font-size=%2240%22%3E📚%3C/text%3E%3C/svg%3E'; this.style.objectFit='contain';" style="width:100%;height:150px;object-fit:cover;border-radius:.6rem .6rem 0 0">` 
    : '';
  
  return `
    <article class="card book-card" data-book-id="${b.id}" tabindex="0">
      ${coverImg}
      <div class="book-status ${statusClass}">${statusLabel}</div>
      <button class="fav-btn" data-id="${b.id}" style="position:absolute;top:.8rem;left:.8rem;background:none;border:none;font-size:1.3rem;cursor:pointer;padding:0;line-height:1;z-index:2" aria-label="즐겨찾기 토글">${heart}</button>
      <h3 class="book-title">${b.title}</h3>
      <p class="book-author">${b.author}</p>
      <div style="margin-top:.4rem;font-size:.85rem;color:var(--spine)">★ ${avg||'0.0'}</div>
      ${selectedBy}
    </article>
  `;
}

// 태그 필터 버튼
let tagsExpanded = false;

function renderTagFilters(){
  const tags = getAllTags();
  const el = document.getElementById('tagFilters');
  if(!tags.length){el.innerHTML='';return}
  
  const maxVisible = 5; // 처음에 보이는 태그 수
  const visibleTags = tagsExpanded ? tags : tags.slice(0, maxVisible);
  const hasMore = tags.length > maxVisible;
  
  el.innerHTML = visibleTags.map(t => {
    const active = currentTag===t ? ' active' : '';
    return `<button class="tag-filter${active}" data-tag="${t}" style="padding:.3rem .6rem;border:1px solid var(--line-strong);border-radius:999px;background:${active?'var(--accent)':'var(--paper)'};cursor:pointer;font-size:.85rem">#${t}</button>`;
  }).join('');
  
  // 더보기 버튼
  if(hasMore){
    el.innerHTML += `<button id="toggleTagsBtn" style="padding:.3rem .6rem;border:1px solid var(--line-strong);border-radius:999px;background:var(--paper);cursor:pointer;font-size:.85rem;color:var(--ink);opacity:.7">${tagsExpanded ? '접기 ▲' : `더보기 (+${tags.length - maxVisible}) ▼`}</button>`;
  }
  
  el.querySelectorAll('.tag-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTag = currentTag===btn.dataset.tag ? '' : btn.dataset.tag;
      renderTagFilters();
      renderLibrary();
    });
  });
  
  // 더보기/접기 버튼
  const toggleBtn = document.getElementById('toggleTagsBtn');
  if(toggleBtn){
    toggleBtn.addEventListener('click', () => {
      tagsExpanded = !tagsExpanded;
      renderTagFilters();
    });
  }
}

// 이벤트 리스너
document.getElementById('searchInput').addEventListener('input', e => {
  currentSearch = e.target.value.trim();
  renderLibrary();
});

document.getElementById('sortSelect').addEventListener('change', e => {
  currentSort = e.target.value;
  renderLibrary();
});

document.getElementById('favOnlyCheck').addEventListener('change', e => {
  favOnly = e.target.checked;
  renderLibrary();
});

// 초기 렌더
renderTagFilters();
renderLibrary();
