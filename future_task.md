# Future Tasks: Portfolio & Blog Integration

본 문서는 현재 구축된 포트폴리오(`root`)와 블로그(`/blog`) 시스템의 고도화를 위한 향후 작업 계획을 담고 있습니다.

## 1. CI/CD 자동화 (GitHub Actions)
현재는 로컬에서 `pnpm run build`를 실행하여 생성된 `blog` 폴더를 직접 push해야 합니다. 이를 자동화하여 개발 경험을 개선합니다.
- [ ] `fuwari` 폴더 내의 소스 변경 시에만 작동하는 전용 Workflow 작성.
- [ ] 블로그 소스(`fuwari`) 빌드 후 결과물을 루트의 `blog` 폴더로 자동 업데이트 및 커밋/푸시.
- [ ] GitHub Pages 배포 시점 제어 로직 추가.

## 2. UI/UX 통합 및 일관성 강화
두 시스템이 서로 다른 기술 스택(Astro vs Plain HTML/JS)을 사용하므로 시각적 연결성을 강화합니다.
- [ ] **공통 테마 시스템**: 포트폴리오의 Ambient Glow 효과와 다크모드 설정을 블로그 테마와 동기화.
- [ ] **Shared Navigation**: 포트폴리오와 블로그의 네비게이션 바 메뉴를 동일하게 구성하여 이질감 최소화.
- [ ] **Smooth Page Transitions**: 포트폴리오와 블로그 간 이동 시 새로고침 없이 부드럽게 전환되도록 `Swup.js`를 전체 사이트로 확장하거나 브라우저의 `View Transitions API` 도입.
- [ ] **Home Back Link**: Fuwari 설정(`src/config.ts`)에서 사이드바의 홈 버튼 주소를 포트폴리오 루트(`https://0x653o.github.io`)로 명시적 지정.

## 3. 기능적 통합 (Dynamic Content)
포트폴리오 메인 페이지에서 블로그의 최신 상태를 실시간으로 보여줍니다.
- [ ] **Latest Posts Widget**: `main.js`에서 `/blog/rss.xml`을 파싱하여 최신 게시글 3개를 포트폴리오 메인 섹션에 렌더링.
- [ ] **Stats Integration**: 블로그의 카테고리나 태그 클라우드를 포트폴리오의 'Skills' 섹션 하단에 배치.

## 4. SEO 및 분석 최적화
- [ ] **Sitemap 통합**: 루트 사이트와 블로그 사이트맵을 하나로 합치거나 검색 엔진에 각각 등록.
- [ ] **Google Analytics**: 포트폴리오와 블로그에 동일한 GA 트래킹 ID 적용하여 통합 방문자 여정 분석.

## 5. 자산 관리 최적화
- [ ] **이미지 호스팅**: 포트폴리오와 블로그에서 공통으로 사용하는 이미지 자산을 루트의 `assets` 폴더로 단일화하여 중복 제거.
- [ ] **Font Optimization**: 웹 폰트 로드 방식을 통일하여 전체 사이트 로딩 속도 개선.
