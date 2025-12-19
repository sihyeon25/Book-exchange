/**
 * ====================================
 * SCHEDULE COORDINATION TOOL
 * 일정 조율 도구 구현
 * ====================================
 * 
 * 이 파일의 기능:
 * 1. 30일간 날짜 그리드 생성
 * 2. 개인별 가능 날짜 선택
 * 3. 친구 코드 공유 및 가져오기
 * 4. 모든 참가자 교집합 날짜 계산
 * 5. 로컬스토리지로 데이터 영속성 보장
 * 
 * 데이터 구조:
 * - my_dates: 내 가능 날짜 배열
 * - friend_codes: 친구들 코드 배열
 */

// ============================================
// 날짜 유틸리티 함수들
// ============================================

// 오늘부터 30일간의 날짜 배열 생성
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

// 날짜를 "MM/DD" 형식으로 표시
function formatDate(d){
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${m}/${dd}`;
}

// 날짜를 문자열 키로 변환 ("YYYY-MM-DD")
function toDateKey(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// 내가 선택한 가능 날짜 목록 가져오기
function getMyDates(){
  try{
    return JSON.parse(localStorage.getItem('my_dates')||'[]');
  }catch{return []}
}

// 내 가능 날짜 로컬스토리지에 저장
function saveMyDates(arr){
  localStorage.setItem('my_dates', JSON.stringify(arr));
}

// 친구들의 코드 목록 가져오기
function getFriendCodes(){
  try{
    return JSON.parse(localStorage.getItem('friend_codes')||'[]');
  }catch{return []}
}

// 친구 코드 목록 저장
function saveFriendCodes(arr){
  localStorage.setItem('friend_codes', JSON.stringify(arr));
}

let myDates = getMyDates();
let friendCodes = getFriendCodes();

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

// 코드 리스트 렌더링
function renderCodeList(){
  const codeListArea = document.getElementById('codeListArea');
  if(!friendCodes.length){
    codeListArea.innerHTML = '';
    return;
  }
  
  const list = friendCodes.map((code, idx) => {
    const dates = code.map(k => {
      const d = new Date(k);
      return `${d.getMonth()+1}/${d.getDate()}`;
    }).join(', ');
    return `
      <div style="padding:.6rem;background:var(--paper);border:1px solid var(--line);border-radius:.5rem;margin-bottom:.5rem;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:.85rem"><strong>친구 ${idx+1}:</strong> ${dates}</span>
        <button class="btn ghost" onclick="removeFriendCode(${idx})" style="font-size:.8rem;padding:.2rem .5rem">삭제</button>
      </div>
    `;
  }).join('');
  
  codeListArea.innerHTML = `<div style="margin-top:.5rem"><strong style="font-size:.9rem">추가된 친구 코드</strong>${list}</div>`;
}

// 친구 코드 삭제
window.removeFriendCode = function(idx){
  friendCodes.splice(idx, 1);
  saveFriendCodes(friendCodes);
  renderCodeList();
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

// 친구 코드 추가
document.getElementById('importBtn').addEventListener('click', () => {
  const code = prompt('친구의 코드를 붙여넣으세요:');
  if(!code) return;
  try{
    const friendDates = JSON.parse(code);
    if(!Array.isArray(friendDates)){
      alert('잘못된 코드입니다.');
      return;
    }
    friendCodes.push(friendDates);
    saveFriendCodes(friendCodes);
    renderCodeList();
    alert('친구 코드가 추가되었습니다!');
  }catch(e){
    alert('코드 파싱 실패. 형식을 확인하세요.');
  }
});

// 교집합 찾기
document.getElementById('findCommonBtn').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  
  if(!myDates.length){
    alert('내 날짜를 먼저 선택하세요.');
    return;
  }
  
  if(!friendCodes.length){
    alert('친구 코드를 먼저 추가하세요.');
    return;
  }
  
  // 모든 코드(내 것 + 친구들)의 교집합 계산
  let common = [...myDates];
  
  friendCodes.forEach(friendDates => {
    common = common.filter(d => friendDates.includes(d));
  });
  
  if(!common.length){
    resultArea.innerHTML = '<div class="panel" style="background:color-mix(in oklab,var(--brand) 5%, var(--paper))"><strong>교집합 결과</strong><p class="muted">공통으로 가능한 날이 없어요. 😢</p></div>';
  }else{
    const list = common.map(k => {
      const d = new Date(k);
      return `${d.getMonth()+1}월 ${d.getDate()}일`;
    }).join(', ');
    resultArea.innerHTML = `<div class="panel" style="background:color-mix(in oklab,var(--accent) 15%, var(--paper))"><strong>교집합 결과 🎉</strong><p>공통 가능 날짜: <strong>${list}</strong></p></div>`;
  }
});

// 초기 렌더
renderDateGrid();
renderCodeList();

// ============================================
// 파일 끝
// schedule-tool.js 로드 완료
// ============================================

