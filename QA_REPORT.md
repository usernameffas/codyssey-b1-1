# B1-1 검증 기록 — 2026-09-20

## 소스 및 개발 환경 검사

- 필수 파일·구조 정적 검사와 `node --check js/main.js` 통과.
- Chromium 메모리 실행과 모의 GitHub API를 이용한 기능 검사 19/19 통과. 모바일 390px·태블릿 768px·데스크톱 1280px의 화면, 메뉴·테마·폼·API 성공 및 오류 상태를 검사했습니다.
- 공개 저장소: https://github.com/usernameffas/codyssey-b1-1
- GitHub Pages 최초 배포 성공 기록: https://github.com/usernameffas/codyssey-b1-1/actions/runs/35491915502

## 배포 사이트 자동 브라우저 검사 및 스크린샷

- 초기 검사 성공 기록: https://github.com/usernameffas/codyssey-b1-1/actions/runs/35492902306
- 검사 대상: https://usernameffas.github.io/codyssey-b1-1/
- 검사 환경: GitHub Actions에서 실행한 자동 Chromium 브라우저.
- 데스크톱 1280px·모바일 390px에서 HTTP 200 및 화면 너비 내 배치를 확인했습니다.
- 프로젝트 카드의 공개 저장소 링크와 소개 표시 내용은 [최신 자동 검사 기록](docs/screenshots/LIVE_QA.md)에서 확인할 수 있습니다. 9월 20일 B1-1 소개 추가 후 자동 검사에서는 링크 5개가 확인되었습니다.
- 모바일 메뉴 열기 → 기술 링크 선택 → 닫힘 확인.
- 이메일 형식 오류 안내와 정상 이름·이메일·메시지 입력 검증 완료 확인. 문의 양식은 학습용 입력 확인 기능입니다.
- 스크롤 850px에서 상단 이동 버튼 표시 및 클릭 후 상단 복귀 확인.
- 다크 모드 전환과 새로고침 이후 `html data-theme=dark`, `localStorage=dark` 유지 확인.
- 공개 사이트에서 자동 촬영한 전체 페이지 이미지: [데스크톱](docs/screenshots/desktop.png), [모바일](docs/screenshots/mobile.png), [모바일 다크 모드](docs/screenshots/dark.png).

## 실제 안드로이드 화면 검토

사용자가 별도로 제공한 휴대전화 화면 3장을 확인했습니다. 화면을 보고 확인한 항목과 자동 브라우저에서 동작을 검사한 항목을 구분해 기록합니다.

| 휴대전화 캡처 | 화면에서 확인한 사항 | 동작 검사 기록 |
| --- | --- | --- |
| 다크 모드 홈 | 로고·테마·햄버거·자기소개·이동 버튼 배치 | 자동 Chromium에서 메뉴 클릭 검사 |
| 다크 모드 Skills | 한 열 기술 카드와 상단 이동 버튼 표시 | 자동 Chromium에서 상단 복귀 검사 |
| 다크 모드 Contact | 이름·이메일·메시지 입력란과 이메일 오류 표시 | 자동 Chromium에서 정상 입력 검증 검사 |

개인 메시지가 포함된 원본 이미지는 별도로 관리하고, 공개 저장소에는 자동 Chromium으로 촬영한 웹페이지 이미지 3장을 수록했습니다. 휴대전화에서 관찰한 화면 범위는 위 표에 기록했습니다.

## 제출 확인

코디세이 과제 화면에 GitHub 저장소 주소, Pages 주소, 요구된 스크린샷을 등록하고 제출 완료 표시를 확인합니다. 제출 현황은 [CHECKLIST.md](CHECKLIST.md)에서 관리합니다.
