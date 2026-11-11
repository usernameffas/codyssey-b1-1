# 코디세이 B1-1 | 나를 소개하는 웹페이지 처음부터 만들기

HTML·CSS·JavaScript로 구현한 반응형 개인 포트폴리오입니다. 과제의 필수 기능을 중심으로 제작했으며, 소개 글과 기본 프로필 일러스트는 학습용 예시입니다.

## 제출 링크

- **GitHub 저장소:** https://github.com/usernameffas/codyssey-b1-1
- **GitHub Pages:** https://usernameffas.github.io/codyssey-b1-1/
- **배포 사이트 자동 브라우저 검사 및 캡처 기록:** [LIVE_QA.md](docs/screenshots/LIVE_QA.md)
- **화면 캡처 폴더:** [docs/screenshots](docs/screenshots/)

## 제출 스크린샷 — 공개 사이트 촬영

GitHub Actions의 자동 Chromium 브라우저로 실제 GitHub Pages 주소에 접속해 데스크톱 화면 1장과 모바일 화면 2장을 촬영했습니다. 별도로 안드로이드 기기에서 확인한 모바일 화면 3장의 검토 내용은 [QA_REPORT.md](QA_REPORT.md)에 기록했습니다.

**데스크톱 1280px** — [원본 이미지 보기](docs/screenshots/desktop.png)

![배포 사이트 데스크톱 화면](docs/screenshots/desktop.png)

**모바일 390px** — [원본 이미지 보기](docs/screenshots/mobile.png)

<img src="docs/screenshots/mobile.png" width="390" alt="배포 사이트의 모바일 전체 페이지">

**다크 모드 390px** — [원본 이미지 보기](docs/screenshots/dark.png)

<img src="docs/screenshots/dark.png" width="390" alt="배포 사이트의 다크 모드 전체 페이지">

## 파일 구성 및 사용 기술

| 파일 | 역할 |
| --- | --- |
| `index.html` | Header·Hero·About·Skills·Projects·Contact·Footer, 시맨틱 구조 및 폼 |
| `css/style.css` | CSS 변수·Flexbox·Grid·768px/1024px 반응형·테마 |
| `js/main.js` | DOM·이벤트·메뉴·스크롤·테마·GitHub API·문의 전송 |
| `js/project-search.js` | 프로젝트 검색과 언어 필터 |
| `js/bonus.js` | Hero 타이핑과 상태 UI 미리보기 |
| `images/profile.svg` | 기본 일러스트 |
| `STUDY_GUIDE.md` | 코드 학습, 이벤트 → 상태 → 렌더링 및 `map/filter/forEach/find` 설명 |
| `PEER_REVIEW_PREP.md` | 동료평가 피드백을 반영한 코드 설명 연습 및 재평가 대비 체크리스트 |
| `CHECKLIST.md` | 실제 완료 항목 및 코디세이 제출 상태 |
| `QA_REPORT.md` | 개발용 검사와 실제 휴대전화 스크린샷 확인 범위 |
| `docs/screenshots/LIVE_QA.md` | 공개 URL 자동 브라우저 검사 결과 |
| `MOBILE_GUIDE.md` | 안드로이드에서 사이트 실행·확인·제출 방법 |

## 구현한 필수 기능

- 의미 있는 HTML 태그, 여섯 영역, 내부 링크, 이미지 대체 텍스트, 폼 레이블.
- 모바일 우선 디자인 및 768px/1024px 반응형, Flexbox·Grid.
- 햄버거 메뉴의 열림/닫힘과 링크 클릭 시 닫힘, 부드러운 스크롤, 스크롤 시 헤더·위로 가기 버튼.
- 다크 모드 전환 및 `localStorage`에 선택 저장/다시 불러오기.
- `IntersectionObserver` 스크롤 등장 애니메이션.
- `fetch`와 `async/await`로 GitHub 공개 저장소 API 호출; 로딩/성공/빈 목록/오류/요청 제한 처리.
- 이름·이메일·메시지 필수 검증, 잘못된 이메일 안내, 정상 입력 시 검증 완료 메시지.

대표 E1/B1-1 저장소에는 `js/main.js`에 정리한 목적·기술·구현·결과를 표시합니다. 나머지 프로젝트의 소개는 GitHub About `Description`을 사용합니다.

## 보너스 기능

- GitHub API의 언어별 버튼을 눌러 프로젝트 목록을 필터링합니다. 검색어와 언어를 함께 사용할 수 있습니다.
- Hero 문장이 한 글자씩 나타납니다. 기기에서 동작 줄이기를 켜면 문장 전체가 바로 표시됩니다.
- 문의 양식은 입력을 확인한 뒤 Formspree로 전송합니다. 수신함에서 실제 메시지 도착 여부를 확인할 수 있습니다.
- 처음 방문하면 시스템 다크 모드를 감지하고, 이후에는 저장한 테마 선택을 우선 적용합니다.

## 실행 및 검증

안드로이드에서는 위 Pages URL을 Chrome 또는 삼성 인터넷으로 엽니다. Windows에서는 저장소를 다운로드하여 `index.html`을 VS Code Live Server로 실행할 수 있습니다. 자동 캡처를 위한 Playwright는 GitHub Actions 검사 환경에서 사용합니다.

- 정적 소스 검사 및 JavaScript 문법 검사 통과.
- Chromium 메모리 실행과 모의 GitHub API를 사용한 기능 검사 19/19 통과.
- GitHub Pages 빌드·배포 성공.
- 공개 GitHub Pages URL 자동 Chromium 접속: 데스크톱/모바일 HTTP 200, 가로 넘침 없음. 프로젝트 링크 수와 표시 내용은 [LIVE_QA.md](docs/screenshots/LIVE_QA.md)에 기록.
- 배포 사이트에서 모바일 메뉴 열기/선택 후 닫기, 이메일 입력 검증, 위로 가기, 다크 모드 새로고침 뒤 유지 확인.
- 안드로이드 기기에서 확보한 화면 3장으로 모바일 배치·다크 화면·이메일 형식 오류·위로 가기 버튼 표시를 확인. 검토 범위는 [QA_REPORT.md](QA_REPORT.md)에 기록.

**과제 제출 단계:** 코디세이 제출 화면에 저장소 URL·Pages URL·요구되는 스크린샷을 제출하고 완료 표시를 확인합니다. 제출 여부는 [CHECKLIST.md](CHECKLIST.md)에서 관리합니다.
