// 라이브러리 페이지 검색/필터/정렬/즐겨찾기 구현

// 즐겨찾기 로컬 저장소
function getFavorites(){
  try{
    return JSON.parse(localStorage.getItem('favorites')||'[]');
  }catch{return []}
}
function toggleFavorite(id){
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if(idx>=0) favs.splice(idx,1);
  else favs.push(id);
  localStorage.setItem('favorites',JSON.stringify(favs));
  renderLibrary();
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
  const reading = list.filter(b => {
    // 임시: id에 따라 나눔 (실제로는 status 필드 추가 권장)
    return ['glico','summer-100m','summer-outside','kind-wins'].includes(b.id);
  });
  const completed = list.filter(b => !reading.includes(b));
  
  let html = '';
  if(reading.length){
    html += '<section class="library-section"><h2 class="section-title">읽는 중</h2><div class="card-grid">';
    reading.forEach(b => { html += renderBookCard(b,'reading') });
    html += '</div></section>';
  }
  if(completed.length){
    html += '<section class="library-section"><h2 class="section-title">완독</h2><div class="card-grid">';
    completed.forEach(b => { html += renderBookCard(b,'completed') });
    html += '</div></section>';
  }
  
  listEl.innerHTML = html;
  
  // 카드 클릭 이벤트
  document.querySelectorAll('.book-card').forEach(card => {
    const id = card.dataset.bookId;
    card.addEventListener('click', () => location.href = `book-detail.html?id=${id}`);
    card.addEventListener('keydown', e => {
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        location.href = `book-detail.html?id=${id}`;
      }
    });
  });
  
  // 즐겨찾기 버튼
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.id);
    });
  });
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
  
  return `
    <article class="card book-card" data-book-id="${b.id}" tabindex="0">
      <div class="book-status ${statusClass}">${statusLabel}</div>
      <button class="fav-btn" data-id="${b.id}" style="position:absolute;top:.8rem;left:.8rem;background:none;border:none;font-size:1.3rem;cursor:pointer;padding:0;line-height:1" aria-label="즐겨찾기 토글">${heart}</button>
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
