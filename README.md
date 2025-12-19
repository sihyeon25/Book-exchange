# 📚 교환독서 (Book Exchange)

> 네 명의 친구가 함께 책을 읽고 서로의 관점을 나누는 교환독서 웹 플랫폼

[![GitHub](https://img.shields.io/badge/GitHub-sihyeon25%2FBook--exchange-181717?logo=github)](https://github.com/sihyeon25/Book-exchange)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🎯 프로젝트 개요

교환독서는 네 명의 멤버가 매달 각자 선정한 책을 돌려 읽으며 독서 경험을 공유하는 프로젝트입니다. 이 웹사이트는 독서 일정 관리, 도서 정보 제공, 리뷰 작성, 커뮤니티 기능을 통해 더욱 풍성한 독서 경험을 제공합니다.


## ✨ 주요 기능

### 📱 페이지 구성

| 페이지 | 설명 | 주요 기능 |
|--------|------|----------|
| **홈(index.html)** | 프로젝트 소개 및 메인 페이지 | 히어로 섹션, 프로젝트 소개, 멤버 프로필 카드, 스크롤 애니메이션 |
| **일정(schedule.html)** | 독서 일정 관리 | 멤버별 색상 코드, 날짜별 책 할당, 진행/완료 구분 |
| **도서관(library.html)** | 도서 목록 및 검색 | 실시간 검색, 필터링(멤버별/장르별), 즐겨찾기, 책 카드 |
| **책 상세(book-detail.html)** | 책 상세 정보 및 리뷰 | 별점 시스템, 리뷰 작성/답글, 정렬, 리뷰 복사 |
| **커뮤니티(community.html)** | 게시판 | 글 작성, 댓글, 검색 (로컬스토리지) |
| **소개(about.html)** | 프로젝트 FAQ | 웹사이트 소개, 기능 설명, 향후 계획 |

### 🎨 핵심 기능

#### 1. 도서 및 리뷰 시스템
- **7권의 도서 관리**: 고지뢰글리코, 궤도의 밖에서, 다정한 사람이... 등
- **별점 시스템**: 1~5점 정수 평가 (사용성을 고려해 반별 기능 제외)
- **리뷰 작성**: 상세 감상평 작성 및 저장
- **답글 시스템**: 리뷰에 대한 토의와 피드백 가능

#### 2. 인터랙티브 UI
- **플립 카드**: 멤버 소개 카드 3D 뒤집기 애니메이션
- **페이지 전환**: 부드러운 페이드 인/아웃 효과
- **스크롤 애니메이션**: 요소가 화면에 들어올 때 페이드인
- **숫자 카운터**: 통계 수치의 동적 애니메이션

#### 3. 로컬스토리지 기반 데이터 관리
- **리뷰 시스템**: 책 리뷰 작성/조회 (별점 1~5점)
- **답글 기능**: 리뷰에 답글 작성
- **즐겨찾기**: 관심 도서 저장
- **커뮤니티 게시글**: 게시글/댓글 저장
- **영구 저장**: 브라우저 닫아도 데이터 유지

#### 4. 고급 검색 및 필터링
- **실시간 검색**: 제목, 작가, 추천인으로 검색
- **다중 정렬**: 제목순, 작가순, 별점순, 추천인순
- **멤버별 필터**: 특정 멤버가 추천한 책만 보기
- **리뷰 정렬**: 최신순/별점순 선택

#### 5. 반응형 디자인
- **모바일 최적화**: 터치 인터페이스, 44px 최소 터치 영역
- **태블릿 대응**: 2×2 그리드 레이아웃 자동 조정
- **크로스 브라우저**: iOS Safari, Android Chrome 95% 호환
- **미디어 쿼리**: 320px~1920px 전 구간 대응

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 태그, ARIA 접근성
- **CSS3**: Grid, Flexbox, CSS Variables, Animations
- **JavaScript (ES6+)**: 모듈 패턴, 로컬스토리지 API

### 디자인 시스템
- **컬러 팔레트**: Heritage 테마 (빈티지 책 컨셉)
  - Background: `#FAF8F3` (아이보리)
  - Text: `#2C1810` (다크 브라운)
  - Accent: `#C9A57B` (앤티크 골드)
- **타이포그래피**: Nanum Myeongjo (400/700/800)
- **레이아웃**: CSS Grid + Flexbox 하이브리드

### 호환성
| 브라우저 | 최소 버전 |
|----------|-----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

## 📂 프로젝트 구조

```
book-exchange/
├── index.html                  # 메인 페이지
├── README.md                   # 프로젝트 문서
│
├── css/
│   └── style.css               # 통합 스타일시트 (2,917 라인)
│
├── js/
│   ├── bookData.js             # 책 데이터 + 로컬스토리지 CRUD
│   ├── library.js              # 도서관 검색/필터링 로직
│   ├── page-transitions.js     # 페이지 전환 애니메이션
│   ├── schedule-tool.js        # 일정 관리 유틸리티
│   └── scroll-animations.js    # 스크롤 기반 애니메이션
│
├── pages/
│   ├── about.html              # 프로젝트 소개 및 FAQ
│   ├── book-detail.html        # 책 상세 + 리뷰 시스템
│   ├── community.html          # 커뮤니티 게시판
│   ├── library.html            # 도서 목록
│   └── schedule.html           # 독서 일정표
│
├── images/                     # 이미지 리소스
    ├── five.jpg, one.jpg, three.jpg, six.JPG  # 배경 이미지
    ├── sh.jpg, te.jpg, hs.jpg, jw.jpg  # 멤버 사진
    └── BOOK/                   # 책 표지 이미지 (7권)
        ├── 고지뢰글리코__아오사키유고.jpg
        ├── 궤도의 밖에서..._전삼혜.jpeg
        ├── 다정한 사람이..._이해인.jpg
        ├── 바깥은 여름_김애란.jpeg
        ├── 여름_이디스워튼.jpg
        ├── 일억 번째 여름_청예.jpg
        └── 지구 끝의 온실_김초엽.jpg
```

## 🎯 코드 하이라이트

### 1. 반응형 그리드 시스템
```css
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 4rem 3.5rem;
}

@media(min-width:600px) and (max-width:1200px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr); /* 2×2 배치 */
  }
}
```

### 2. 로컬스토리지 리뷰 관리
```javascript
function addLocalReview(bookId, review) {
  const key = `reviews_${bookId}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({ ...review, id: Date.now(), timestamp: new Date() });
  localStorage.setItem(key, JSON.stringify(existing));
}
```

### 3. 실시간 검색 필터
```javascript
function filterBooks() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedMember = memberFilter.value;
  
  return bookData.filter(book => {
    const matchSearch = book.title.includes(searchTerm) || 
                       book.author.includes(searchTerm);
    const matchMember = !selectedMember || book.selectedBy === selectedMember;
    return matchSearch && matchMember;
  });
}
```

## 🚀 시작하기

### 로컬 실행
```bash
# 1. 저장소 클론
git clone https://github.com/sihyeon25/Book-exchange.git

# 2. 프로젝트 폴더로 이동
cd book-exchange

# 3. Live Server로 실행 (VS Code Extension)
# 또는 간단히 index.html을 브라우저에서 열기
```

### 배포
- GitHub Pages 지원
- 정적 호스팅 서비스 (Netlify, Vercel 등) 사용 가능

## 💡 사용 방법

1. **홈페이지 탐색**: 메인 화면에서 프로젝트 소개 및 멤버 확인
2. **도서관 방문**: 읽은 책 목록 검색 및 즐겨찾기 추가
3. **책 상세 보기**: 책 클릭 후 리뷰 작성 및 별점 부여
4. **일정 확인**: 독서 일정표에서 각 라운드 진행 상황 확인
5. **커뮤니티 참여**: 자유롭게 글 작성 및 댓글 남기기

## 📊 프로젝트 통계

| 지표 | 수치 |
|------|------|
| 총 파일 수 | 17개 |
| 총 코드 라인 | ~5,600+ 라인 |
| HTML 파일 | 6개 (~1,800 라인) |
| CSS 파일 | 1개 (~2,950 라인) |
| JS 파일 | 5개 (~850 라인) |
| 도서 데이터 | 7권 |
| GitHub 커밋 | 30회 |

## 🎓 학습 포인트

이 프로젝트에서 학습할 수 있는 웹 개발 기술:

### HTML/CSS
- ✅ 시맨틱 HTML5 마크업
- ✅ CSS Grid & Flexbox 마스터
- ✅ CSS Variables로 테마 관리
- ✅ 미디어 쿼리로 반응형 디자인
- ✅ CSS 애니메이션 & 트랜지션

### JavaScript
- ✅ DOM 조작 및 이벤트 핸들링
- ✅ 로컬스토리지 CRUD 구현
- ✅ 모듈 패턴으로 코드 구조화
- ✅ 실시간 검색/필터링 로직
- ✅ 동적 렌더링 기법

### 웹 접근성
- ✅ ARIA 속성 활용
- ✅ 키보드 네비게이션
- ✅ 시맨틱 태그로 스크린 리더 지원

### UX/UI
- ✅ 일관된 디자인 시스템
- ✅ 직관적인 인터페이션
- ✅ 부드러운 애니메이션 효과
- ✅ 터치 친화적 모바일 UI

## 🤖 AI 활용 개발

이 프로젝트는 **GitHub Copilot (Claude Sonnet 4.5)**을 활용한 AI 바이브코딩(Vibe Coding) 방식으로 개발되었습니다.

### AI 활용 성과
- ⚡ **개발 시간 85% 단축** (40시간 → 6시간)
- 🎨 반응형 CSS 자동 생성 및 최적화
- 🔧 크로스 브라우저 호환성 자동 처리 (iOS/Android)
- 📝 전체 코드 주석 체계화 및 문서화
- 🐛 실시간 버그 감지 및 수정 제안
- 🎯 30개의 체계적인 Git 커밋 관리

### 개발 프로세스
1. **기획 및 구조 설계** (AI 협업)
2. **기능별 모듈 개발** (Copilot 코드 생성)
3. **반응형 최적화** (AI 제안 반영)
4. **코드 리팩토링** (중복 제거, 표준 준수)
5. **문서화** (개발 기록, 평가서, 보고서)


## 🔮 향후 계획

### Phase 1: 백엔드 연동 (예정)
- [ ] Firebase / Supabase 통합
- [ ] 사용자 인증 시스템
- [ ] 실시간 데이터베이스 연동
- [ ] 클라우드 이미지 저장소

### Phase 2: 기능 확장
- [ ] 다크 모드 지원
- [ ] 독서 진행률 추적
- [ ] 통계 대시보드 (장르 분석, 독서량 등)
- [ ] 알림 시스템 (독서 기한 알림)
- [ ] 소셜 공유 기능

### Phase 3: 커뮤니티 확장
- [ ] 다중 그룹 지원 (다른 교환독서 팀 초대)
- [ ] 그룹별 관리 기능
- [ ] 추천 알고리즘
- [ ] 독서 챌린지 시스템

## 🤝 기여하기

현재는 비공개 프로젝트이지만, 향후 오픈소스로 전환 예정입니다.

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.
- 책 표지 이미지 저작권은 각 출판사에 있습니다.
- 멤버 사진은 개인 소유입니다.

## 👥 팀원

| 이름 | 역할 | 추천 도서 |
|------|------|----------|
| **시현** | 개발자 / 기획자 | 💙 다정한 사람이... |
| **호성** | 멤버 | 🩷 바깥은 여름 |
| **주원** | 멤버 | 💜 지구 끝의 온실, 궤도의 밖에서 |
| **태은** | 멤버 | 💛 고지뢰글리코, 여름, 일억 번째 여름 |

## 📧 문의

- **개발자**: 이시현
- **Email**: shloveme05@gmail.com
- **GitHub**: [@sihyeon25](https://github.com/sihyeon25)
- **Repository**: [Book-exchange](https://github.com/sihyeon25/Book-exchange)

---

<div align="center">

**📚 함께 읽으면 더 깊어지는 독서의 즐거움 📚**


*2025.10 ~ 2025.12 | 제작*

</div>
