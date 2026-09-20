# 코디세이 B1-1 | 나를 소개하는 웹페이지 처음부터 만들기

순수 HTML·CSS·JavaScript로 만든 반응형 개인 포트폴리오입니다. React, Vue, jQuery 등 외부 UI 라이브러리는 사용하지 않았으며 선택 보너스 기능은 제외했습니다. 소개 글과 기본 프로필 일러스트는 학습용 예시입니다.

## 제출 링크

- **GitHub 저장소:** https://github.com/usernameffas/codyssey-b1-1
- **배포 사이트:** https://usernameffas.github.io/codyssey-b1-1/
- **배포 기록:** https://github.com/usernameffas/codyssey-b1-1/actions/runs/35491915502

2026-09-20 GitHub Pages의 빌드·배포 작업이 성공으로 완료되었고, 사이트가 휴대전화에서 열린다는 점을 확인했습니다. 실제 휴대전화에서 모든 상호작용과 GitHub API 응답을 검사했다는 뜻은 아닙니다. 완료 항목과 남은 확인 사항은 [CHECKLIST.md](CHECKLIST.md)에 구분했습니다.

## 기술과 파일 구성

| 파일 | 역할 |
| --- | --- |
| `index.html` | Header, Hero, About, Skills, Projects, Contact, Footer와 폼 구조 |
| `css/style.css` | CSS 변수, Flexbox·Grid, 768px·1024px 반응형, 다크 모드 |
| `js/main.js` | 이벤트, 메뉴·스크롤·테마, GitHub API, 입력 검증 |
| `images/profile.svg` | 개인 사진을 대체하는 기본 일러스트 |
| `STUDY_GUIDE.md` | 기능별 코드 흐름과 학습 내용 |
| `QA_REPORT.md` | 자동 테스트 결과 및 시험 범위 |
| `MOBILE_GUIDE.md` | 안드로이드에서 실행·검사·스크린샷·제출하는 방법 |

## 구현한 필수 기능

- 의미 있는 HTML 태그, 여섯 개 영역, 내부 이동 링크, 이미지 대체 텍스트, 폼 레이블
- 모바일 우선 레이아웃과 768px/1024px 반응형; Flexbox와 Grid
- 모바일 햄버거 메뉴와 메뉴 선택 시 닫힘, 부드러운 앵커 이동, 스크롤에 따른 헤더 및 맨 위 버튼
- 다크 모드 전환 및 `localStorage`에 저장한 설정 다시 불러오기
- `IntersectionObserver` 스크롤 등장 애니메이션
- GitHub 공개 저장소 API에 `fetch`와 `async/await` 사용; 로딩·성공·빈 목록·실패·요청 제한 상태 표시
- 문의 양식의 필수값 및 이메일 형식 검사, 필드별 오류 메시지

**문의 양식은 학습용입니다.** 유효성 검사를 통과해도 이메일이나 메시지가 실제로 전송되지는 않습니다. 실제 전송은 선택 보너스여서 구현하지 않았습니다. GitHub 접근 토큰·비밀번호도 사용하지 않습니다.

## 실행 방법

- **안드로이드:** 배포 사이트 URL을 Chrome이나 삼성 인터넷에서 엽니다. 자세한 확인 순서는 [MOBILE_GUIDE.md](MOBILE_GUIDE.md)에 있습니다.
- **컴퓨터:** 저장소를 내려받은 뒤 `index.html`을 VS Code Live Server로 실행하거나 배포 사이트에 접속합니다. Python·Node·Docker 설치는 웹사이트 실행에 필수가 아닙니다.

## 검증 결과와 남은 과제

- 필수 소스 정적 검사: 통과.
- `node --check js/main.js`: 통과.
- Chromium에서 코드의 HTML·CSS·JavaScript를 메모리에 로드해 시험용 GitHub API 응답으로 검사: **19/19 통과**. 세 화면 크기의 가로 넘침, 메뉴, 테마, 스크롤, 폼, API 상태 등을 확인했습니다. API 결과는 모의 데이터이므로 실제 게시 사이트의 API 동작을 보증하지 않습니다.
- GitHub Pages 배포 작업: **성공**. 사용자 확인으로 모바일에서 사이트가 열렸습니다.
- **추가 확인 필요:** 게시 주소의 실제 GitHub 카드, 테마 새로고침 유지, 폼 및 메뉴 동작 확인; 제출용 데스크톱·모바일·다크 모드 화면 캡처 3장; 코디세이 제출 완료.

## 제출 스크린샷

최종 제출용 이미지는 실제 배포 사이트를 연 상태에서 촬영한 후 아래 경로에 저장합니다. 이 문서 작성 시점에는 아직 첨부되지 않았습니다.

- `docs/screenshots/desktop.png` — 데스크톱 레이아웃
- `docs/screenshots/mobile.png` — 모바일 레이아웃
- `docs/screenshots/dark.png` — 다크 모드

개발 과정에서 만든 모의 API 스크린샷은 배포 사이트 캡처와 구분하며 최종 배포 증빙으로 사용하지 않습니다. 실명·연락처 대신 익명 소개를 사용했으므로 공개 정보는 [사이트](https://usernameffas.github.io/codyssey-b1-1/)에서 확인 후 필요에 따라 수정합니다.
