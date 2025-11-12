// 기본 책 데이터 (데모용)
// 백엔드 없이 동작하도록 클라이언트 내에서 보관합니다.
// 표지 이미지가 없으면 자동으로 플레이스홀더가 표시됩니다.

const books = [
  {
    id: "glico",
    title: "지뢰 글리코",
    author: "아오사키 유고",
    publisher: "리드비",
    year: "2025",
    pages: "344쪽",
    category: "소설 > 일본소설 > 미스터리",
    cover: "../images/BOOK/고지뢰글리코__아오사키유고.jpg",
    description: "고등학생들이 치밀한 논리전으로 펼치는 게임식 미스터리. 두뇌전과 반전이 돋보이는 청춘 추리소설.",
    tags: ["미스터리", "청춘", "게임"],
    selectedBy: "태이",
    reviews: [
      { user: "시현", rating: 5, comment: "손에서 놓을 수 없었어요!" },
      { user: "태이", rating: 4, comment: "트릭 구성이 신선했어요." }
    ]
  },
  {
    id: "summer-100m",
    title: "일억 번째 여름",
    author: "청예",
    publisher: "창비",
    year: "2025",
    pages: "332쪽",
    category: "소설 > 청소년소설",
    cover: "../images/BOOK/일억 번째 여름_청예.jpg",
    description: "일억 번째 여름이 오면 한 종족이 멸망한다는 예언에서 출발해 사랑과 구원의 서사를 그린 청소년 판타지.",
    tags: ["청소년소설", "한국소설", "사랑"],
    selectedBy: "희수",
    reviews: [
      { user: "희수", rating: 4, comment: "문장이 예뻐요." }
    ]
  },
  {
    id: "summer-outside",
    title: "바깥은 여름",
    author: "김애란",
    publisher: "문학동네",
    year: "2017",
    pages: "272쪽",
    category: "소설 > 한국단편소설",
    cover: "../images/BOOK/바깥은 여름_김애란.jpeg",
    description: "상실을 경험한 인물들이 관계와 시간 속에서 애도의 의미를 찾아가는 일곱 편의 단편 모음집.",
    tags: ["한국소설", "단편집", "상실"],
    selectedBy: "시현",
    reviews: [
      { user: "시현", rating: 5, comment: "여운이 오랫동안 남아요." }
    ]
  },
  {
    id: "orbit-roommate",
    title: "궤도의 밖에서, 나의 룸메이트에게",
    author: "전삼혜",
    publisher: "문학동네",
    year: "2023",
    pages: "392쪽",
    category: "소설 > 한국소설",
    cover: "../images/BOOK/궤도의 밖에서..._전삼혜.jpeg",
    description: "사회의 궤도 밖으로 밀려난 청소년들이 서로를 구하고 사랑하며 연대하는 이야기. 퀴어 감성과 SF적 상상력이 결합된 성장소설.",
    tags: ["한국소설", "SF", "퀴어"],
    selectedBy: "희수",
    reviews: [
      { id: "orbit_r1", user: "시현", rating: 3, comment: "왜 그렇게 희생하는건데!! 본인 목숨보다 중요한건 없다고!!!" },
      { id: "orbit_r2", user: "태이", rating: 4.5, comment: "꼭 그렇게 다 죽여야 속이 시원했냐!", replies: [
        { user: "희수", comment: "그래서 좋은건데" }
      ]},
      { id: "orbit_r3", user: "희수", rating: 5, comment: "슈리우단 행복해줘(이미 죽었지 아차)" }
    ]
  },
  {
    id: "greenhouse-earthend",
    title: "지구 끝의 온실",
    author: "김초엽",
    publisher: "자이언트북스",
    year: "2021",
    pages: "308쪽",
    category: "소설 > 한국소설",
    cover: "../images/BOOK/지구 끝의 온실_김초엽.jpg",
    description: "더스트로 황폐해진 지구에서 식물학자 아영과 생존 공동체의 이야기를 통해 생명과 연대, 회복을 다룬 한국 SF 장편.",
    tags: ["SF", "디스토피아", "생태"],
    selectedBy: "태이",
    reviews: [
      { user: "희수", rating: 4.5, comment: "김초엽." },
      { user: "시현", rating: 4, comment: "김초엽 작가님은 처음이지만 sf 존잼, 다 사형 시켜 로봇은 죄가 없다!!" },
      { user: "태이", rating: 4, comment: "믿고보는 김초엽" }
    ]
  },
  {
    id: "summer-wharton",
    title: "여름",
    author: "이디스 워튼",
    publisher: "민음사",
    year: "2022",
    pages: "268쪽",
    category: "소설 > 고전문학",
    cover: "../images/BOOK/여름_이디스워튼.jpg",
    description: "산골 소녀 채리티가 도시 출신 남성과의 만남을 통해 욕망과 자아를 발견하는 고전 성장소설.",
    tags: ["고전", "성장소설", "여성서사"],
    selectedBy: "시현",
    reviews: [
      { user: "희수", rating: 1, comment: "여주, 남주, 남주..인 줄 알았던 놈, 기타 마을 녀석들...다 그냥 가라... 내 눈 앞에 보이지마라... 덕분에 저혈압이 치료됐어요! 근데 시원하게 욕하고 싶으면 한번쯤 보는걸 추천. 고전인 점을 감안하면 재밌음. 그냥 내 취향에 맞지 않았을 뿐..." },
      { user: "태이", rating: 3.5, comment: "고구마 조금 사이다 많이 주세요\n네 주문하신 고구마 많이 나왔습니다" },
      { user: "시현", rating: 2, comment: "하... 결말 최악 남주 최악 주인공 최악.. 시대 배경 고려하고 봐도 짜증남" }
    ]
  },
  {
    id: "kind-wins",
    title: "다정한 사람이 이긴다",
    author: "이해인",
    publisher: "필름(Feelm)",
    year: "2025",
    pages: "256쪽",
    category: "에세이 > 인간관계/심리",
    cover: "../images/BOOK/다정한 사람이..._이해인.jpg",
    description: "'다정함'이 관계와 사회를 변화시키는 힘임을 이야기하는 심리 에세이. 인간관계의 본질과 회복을 다룸.",
    tags: ["에세이", "관계", "자기계발"],
    selectedBy: "지원",
    reviews: []
  }
];

// 유틸: 특정 id로 책 조회
function getBookById(id){
  return books.find(b => b.id === id);
}

// 유틸: 평균 평점 계산
function computeAverageRating(book){
  const local = getLocalReviews(book.id);
  const all = [...(book.reviews||[]), ...(local||[])];
  if(!all.length) return 0;
  const sum = all.reduce((acc, r) => acc + (Number(r.rating)||0), 0);
  return Math.round((sum / all.length) * 10) / 10; // 소수점 1자리
}

// 로컬스토리지에 저장된 리뷰 가져오기
function getLocalReviews(bookId){
  try{
    const raw = localStorage.getItem(`reviews_${bookId}`);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    return [];
  }
}

// 로컬스토리지에 리뷰 저장하기 (추가)
function addLocalReview(bookId, review){
  const list = getLocalReviews(bookId);
  // 리뷰에 고유 ID 추가 (타임스탬프 기반)
  review.id = Date.now();
  review.timestamp = new Date().toISOString();
  list.push(review);
  localStorage.setItem(`reviews_${bookId}`, JSON.stringify(list));
}

// 답글 관련 함수
function getReviewReplies(bookId, reviewId){
  try{
    const raw = localStorage.getItem(`replies_${bookId}_${reviewId}`);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    return [];
  }
}

function addReviewReply(bookId, reviewId, reply){
  const list = getReviewReplies(bookId, reviewId);
  reply.timestamp = new Date().toISOString();
  list.push(reply);
  localStorage.setItem(`replies_${bookId}_${reviewId}`, JSON.stringify(list));
}
