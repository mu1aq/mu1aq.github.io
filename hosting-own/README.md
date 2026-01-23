# 포트폴리오 웹사이트 - 폴더 구조 및 설명

## 📁 완전한 폴더 구조

```
portfolio-website/
├── templates/
│   └── index.html                 # 메인 HTML 파일
├── static/
│   ├── css/
│   │   └── styles.css            # 모든 스타일시트
│   └── js/
│       └── main.js               # 모든 JavaScript 로직
├── .gitignore                    # Git 제외 파일
├── README.md                     # 프로젝트 문서
└── server.py                     # Python 간단 서버 (선택사항)
```

---

## 📄 파일 설명

### `templates/index.html`
- **용도**: 메인 페이지 마크업
- **포함사항**: 
  - 내비게이션 바
  - Hero 섹션
  - About 섹션
  - Skills 섹션
  - Projects 섹션
  - CTF Achievements 섹션
  - Contact 섹션
  - Footer
- **외부 리소스 참조**:
  - `../static/css/styles.css` (CSS)
  - `../static/js/main.js` (JavaScript)

### `static/css/styles.css`
- **용도**: 모든 스타일링 (CSS 변수 포함)
- **주요 기능**:
  - CSS 변수로 색상 관리 (`:root` 정의)
  - 다크 테마 컬러 팔레트
  - 반응형 레이아웃 (미디어쿼리)
  - 애니메이션 정의 (`@keyframes`)
  - 모든 섹션 스타일링

### `static/js/main.js`
- **용도**: JavaScript 기능 구현
- **주요 기능**:
  1. **부드러운 스크롤**: 네비게이션 링크 클릭 시 부드럽게 스크롤
  2. **Intersection Observer**: 요소가 뷰포트에 진입할 때 페이드인 애니메이션
  3. **활성 네비게이션 표시**: 현재 섹션에 맞게 네비게이션 색 변경
  4. **모바일 메뉴**: 필요시 토글 기능

---

## 🚀 실행 방법

### 방법 1: Python 간단 서버 사용 (권장)

```bash
# 프로젝트 디렉토리에서
python -m http.server 8000

# 또는 Python 2
python -m SimpleHTTPServer 8000

# 브라우저에서 접속
# http://localhost:8000/templates/index.html
```

### 방법 2: Node.js http-server 사용

```bash
# 설치 (첫 번째 실행만)
npm install -g http-server

# 실행
http-server

# 브라우저에서 접속
# http://localhost:8080/templates/index.html
```

### 방법 3: VS Code Live Server 확장

1. VS Code에서 "Live Server" 확장 설치
2. `index.html`에서 우클릭 → "Open with Live Server"
3. 자동으로 브라우저 열림

---

## 🎨 CSS 변수 (커스터마이징)

`static/css/styles.css`의 `:root` 섹션에서 색상 조정 가능:

```css
:root {
    --primary: #00d4ff;           /* 주요 색상 (시안) */
    --primary-dark: #0099cc;      /* 어두운 주요 색상 */
    --bg-dark: #0a0e27;           /* 어두운 배경 */
    --bg-darker: #050812;         /* 더 어두운 배경 */
    --text-primary: #e8eef7;      /* 주요 텍스트 */
    --text-secondary: #a0afc9;    /* 보조 텍스트 */
    --accent: #ff006e;            /* 강조 색상 (마젠타) */
    --accent-secondary: #8338ec;  /* 보조 강조 색상 (보라) */
    --border: #1a2043;            /* 테두리 색상 */
}
```

---

## 📱 반응형 디자인

모든 섹션이 반응형으로 설계되어 있습니다:
- **데스크톱** (1200px+): 2-3열 그리드
- **태블릿** (768px-1199px): 2열 레이아웃
- **모바일** (767px-): 1열 레이아웃

---

## ✨ JavaScript 기능

### 1. 부드러운 스크롤
네비게이션 링크를 클릭하면 부드럽게 스크롤됩니다.

```javascript
target.scrollIntoView({ behavior: 'smooth' });
```

### 2. Fade-in 애니메이션
스킬 카드, 프로젝트 카드, 성과가 뷰포트 진입 시 나타납니다.

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
});
```

### 3. 활성 네비게이션
스크롤 위치에 따라 네비게이션 색상이 변경됩니다.

---

## 📝 커스터마이징 가이드

### 1. 개인 정보 수정
`templates/index.html`에서:
- 이름, 직책, 설명 수정
- 통계 숫자 업데이트
- 프로젝트 정보 변경
- 연락처 링크 업데이트 (GitHub, LinkedIn, Email)

### 2. 프로젝트 추가/삭제
`.project-card` 요소를 복사하여 `projects-grid` 내에 추가

### 3. 스킬 정보 수정
`.skill-card` 요소의 내용 수정

### 4. 색상 변경
`static/css/styles.css`의 `:root` 섹션 수정

---

## 🔧 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - CSS 그리드 & Flexbox
  - CSS 변수 (커스텀 프로퍼티)
  - 미디어 쿼리
  - 애니메이션
- **JavaScript (ES6+)**:
  - Intersection Observer API
  - DOM 조작
  - 이벤트 리스너

---

## 🌐 배포 옵션

### 1. GitHub Pages
```bash
git add .
git commit -m "Portfolio website"
git push origin main
# GitHub 저장소 settings → Pages → main branch 선택
```

### 2. Netlify
1. `netlify.com`에 가입
2. 저장소 연결
3. 빌드 설정 없이 자동 배포

### 3. Vercel
1. `vercel.com`에 가입
2. 저장소 가져오기
3. 자동 배포

### 4. AWS S3 + CloudFront
```bash
# S3에 파일 업로드
aws s3 sync . s3://your-bucket-name
```

---

## 📋 체크리스트

배포 전 확인 사항:
- [ ] 모든 개인 정보 입력 완료
- [ ] GitHub, LinkedIn, Email 링크 업데이트
- [ ] 프로젝트 정보 추가/수정
- [ ] 모바일에서 테스트 완료
- [ ] 모든 링크 작동 확인
- [ ] 색상 팔레트 최종 확인

---

## 🐛 문제 해결

### 스타일이 적용되지 않는 경우
1. 브라우저 캐시 삭제 (Ctrl+Shift+R 또는 Cmd+Shift+R)
2. CSS 파일 경로 확인: `../static/css/styles.css`

### JavaScript가 작동하지 않는 경우
1. 브라우저 콘솔 확인 (F12)
2. JS 파일 경로 확인: `../static/js/main.js`
3. 오류 메시지 확인

### 반응형 문제
1. 브라우저 개발자 도구에서 반응형 모드 확인
2. 모바일 기기에서 직접 테스트

---

## 📧 지원 및 문의

질문이나 문제가 있으면 이슈를 등록하거나 연락주세요.

---

**마지막 업데이트**: 2026년 1월 24일
