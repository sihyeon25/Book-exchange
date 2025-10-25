// 일정 조율 도구: 가능 날짜 선택 + 교집합 계산

// 다음 30일 생성
function getNext30Days(){
  const days = [];
  const today = new Date();
  for(let i=0; i<30; i++){
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDate(d){
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${m}/${dd}`;
}

function toDateKey(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// 로컬 저장소
function getMyDates(){
  try{
    return JSON.parse(localStorage.getItem('my_dates')||'[]');
  }catch{return []}
}
function saveMyDates(arr){
  localStorage.setItem('my_dates', JSON.stringify(arr));
}

let myDates = getMyDates();

// 날짜 그리드 렌더
function renderDateGrid(){
  const days = getNext30Days();
  const grid = document.getElementById('dateGrid');
  grid.innerHTML = days.map(d => {
    const key = toDateKey(d);
    const checked = myDates.includes(key) ? 'checked' : '';
    return `
      <label style="display:flex;align-items:center;gap:.3rem;padding:.4rem;border:1px solid var(--line);border-radius:.5rem;cursor:pointer;background:${checked?'var(--accent)':'var(--paper)'}">
        <input type="checkbox" data-key="${key}" ${checked} style="cursor:pointer">
        <span style="font-size:.9rem">${formatDate(d)}</span>
      </label>
    `;
  }).join('');
  
  // 체크박스 이벤트
  grid.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = cb.dataset.key;
      if(cb.checked){
        if(!myDates.includes(key)) myDates.push(key);
      }else{
        myDates = myDates.filter(k => k!==key);
      }
      saveMyDates(myDates);
      renderDateGrid();
    });
  });
}

// 내 코드 복사
document.getElementById('exportBtn').addEventListener('click', () => {
  if(!myDates.length){
    alert('선택한 날짜가 없습니다.');
    return;
  }
  const code = JSON.stringify(myDates);
  navigator.clipboard.writeText(code).then(() => {
    alert('내 코드가 복사되었습니다!\n친구에게 전달하세요.');
  }).catch(() => {
    prompt('아래 코드를 복사하세요:', code);
  });
});

// 친구 코드 붙여넣기
document.getElementById('importBtn').addEventListener('click', () => {
  const code = prompt('친구의 코드를 붙여넣으세요:');
  if(!code) return;
  try{
    const friendDates = JSON.parse(code);
    if(!Array.isArray(friendDates)){
      alert('잘못된 코드입니다.');
      return;
    }
    // 교집합 계산
    const common = myDates.filter(d => friendDates.includes(d));
    const resultArea = document.getElementById('resultArea');
    if(!common.length){
      resultArea.innerHTML = '<div class="panel" style="background:color-mix(in oklab,var(--brand) 5%, var(--paper))"><strong>교집합 결과</strong><p class="muted">공통으로 가능한 날이 없어요. 😢</p></div>';
    }else{
      const list = common.map(k => {
        const d = new Date(k);
        return `${d.getMonth()+1}월 ${d.getDate()}일`;
      }).join(', ');
      resultArea.innerHTML = `<div class="panel" style="background:color-mix(in oklab,var(--accent) 15%, var(--paper))"><strong>교집합 결과 🎉</strong><p>공통 가능 날짜: <strong>${list}</strong></p></div>`;
    }
  }catch(e){
    alert('코드 파싱 실패. 형식을 확인하세요.');
  }
});

// 초기 렌더
renderDateGrid();
