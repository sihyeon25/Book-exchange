// 기본 책 데이터 (데모용)
// 백엔드 없이 동작하도록 클라이언트 내에서 보관합니다.
// 표지 이미지가 없으면 자동으로 플레이스홀더가 표시됩니다.

const books = [
  {
    id: "glico",
    title: "지뢰 글리코",
    author: "아오사키 유고",
    publisher: "",
    year: "",
    cover: "", // 이미지가 없으면 빈 문자열 유지
    description: "미스터리 게임처럼 전개되는 긴장감 넘치는 이야기.",
    tags: ["미스터리", "스릴러"],
    reviews: [
      { user: "시현", rating: 5, comment: "손에서 놓을 수 없었어요!" },
      { user: "태이", rating: 4, comment: "트릭 구성이 신선했어요." }
    ]
  },
  {
    id: "summer-100m",
    title: "일억 번째 여름",
    author: "청예",
    publisher: "",
    year: "",
    cover: "",
    description: "여름의 공기와 감정이 가득한 청춘 드라마.",
    tags: ["청춘", "감성"],
    reviews: [
      { user: "희수", rating: 4, comment: "문장이 예뻐요." }
    ]
  },
  {
    id: "summer-outside",
    title: "바깥은 여름",
    author: "김애란",
    publisher: "문학과지성사",
    year: "2017",
    cover: "",
    description: "일상의 틈 사이로 스며드는 상실과 위로의 단편들.",
    tags: ["단편", "현대문학"],
    reviews: [
      { user: "시현", rating: 5, comment: "여운이 오랫동안 남아요." }
    ]
  },
  {
    id: "orbit-roommate",
    title: "궤도의 밖에서, 나의 룸메이트에게",
    author: "전삼혜",
    publisher: "아작",
    year: "2020",
    cover: "",
    description: "경쾌하고 다정한 청춘소설, 서로에게 닿아가는 이야기.",
    tags: ["청춘", "힐링"],
    reviews: [
      { user: "태이", rating: 4, comment: "따뜻하고 기분 좋아지는 책." }
    ]
  },
  {
    id: "greenhouse-earthend",
    title: "지구끝의 온실",
    author: "김초엽",
    publisher: "자이언트북스",
    year: "2021",
    cover: "",
    description: "SF와 생태학이 만난 인류와 식물의 이야기.",
    tags: ["SF", "생태"],
    reviews: [
      { user: "시현", rating: 5, comment: "가장 좋아하는 김초엽 작품 중 하나." },
      { user: "희수", rating: 4, comment: "잔잔하지만 강해요." }
    ]
  },
  {
    id: "summer-wharton",
    title: "여름",
    author: "이디스 워튼",
    publisher: "현대문학",
    year: "2021",
    cover: "",
    description: "고전의 매력을 담은 로맨스와 성장의 기록.",
    tags: ["고전", "로맨스"],
    reviews: [
      { user: "태이", rating: 3, comment: "차분한 분위기가 좋아요." }
    ]
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
  list.push(review);
  localStorage.setItem(`reviews_${bookId}`, JSON.stringify(list));
}
