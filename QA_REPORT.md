# B1-1 검증 기록 — 2026-09-20

## 소스 및 개발 환경 시험

- 소스 필수 파일·구조 정적 검사와 `node --check js/main.js` 통과.
- Chromium 메모리 실행과 **모의 GitHub API**를 이용한 기능 검사 19/19 통과. 모바일 390px·태블릿 768px·데스크톱 1280px, 메뉴·테마·폼·모의 API 성공/실패 상태 등을 검사함. 모의 테스트와 실제 배포 도메인 테스트를 혼동하지 않습니다.
- GitHub 공개 저장소 코드 업로드 완료: https://github.com/usernameffas/codyssey-b1-1
- GitHub Pages 빌드·배포 성공 기록: https://github.com/usernameffas/codyssey-b1-1/actions/runs/35491915502

## 실제 게시 사이트 자동 브라우저 시험 및 스크린샷

- 실행 기록: https://github.com/usernameffas/codyssey-b1-1/actions/runs/35492902306 — **성공**.
- 시험 대상은 공개된 실제 URL https://usernameffas.github.io/codyssey-b1-1/ 이며, Github Actions에서 설치한 Chromium으로 접속합니다. **실제 삼성 휴대전화나 Windows PC 실기 테스트라고 표현하지 않습니다.**
- 데스크톱 1280px·모바일 390px에서 HTTP 200 및 가로 넘침 없음을 확인.
- 프로젝트 영역에 실시간 GitHub 저장소 링크 4개 확인. 이름과 설명은 [실제 시험 결과](docs/screenshots/LIVE_QA.md)에 기록.
- 모바일 메뉴 열기 → 기술 링크 선택 → 닫힘 확인.
- 이메일 형식 오류 표시 및 정상 이름/이메일/메시지 입력 검증 성공 확인. 실제 이메일 발송 기능은 미구현 보너스입니다.
- 스크롤 850px에서 상단 버튼 표시 및 클릭 후 상단 복귀 확인.
- 다크 모드 전환 후 새로고침 시 `html data-theme=dark`, `localStorage=dark` 유지 확인.
- **실제 공개 사이트 캡처 3장** 업로드 완료: [desktop.png](docs/screenshots/desktop.png), [mobile.png](docs/screenshots/mobile.png), [dark.png](docs/screenshots/dark.png). 모두 실제 배포 URL을 캡처한 자동 Chromium 화면이며 모의 API 그림이 아닙니다.

## 실제 안드로이드 사용자 제공 이미지 검토

사용자가 별도로 제공한 실제 기기 캡처 3장으로 다음을 확인했습니다. 이 사진은 GitHub Actions에서 생성된 캡처와 출처가 다릅니다.

| 실제 휴대전화 화면 | 눈으로 확인되는 내용 | 추가 동작 증명이 필요한 부분 |
| --- | --- | --- |
| 다크 모드 홈 | 로고·테마·햄버거·자기소개·내부 이동 버튼의 모바일 배치 | 메뉴 실제 클릭 |
| 다크 모드 Skills | 한 열 기술 카드와 상단 복귀 버튼 표시 | 복귀 버튼 실제 클릭 |
| 다크 모드 Contact | 이름·이메일·메시지 입력란과 잘못된 이메일에 대한 오류 표시 | 정상 입력 검증 결과 |

알림에 타인의 메시지가 포함된 원본 이미지는 공개 저장소에 올리지 않았습니다. 별도로 상단 알림·하단 시스템 영역만 자른 사본을 비공개 제출 자료로 준비했습니다. GitHub 저장소의 3가지 필수 스크린샷은 별도로 **실제 공개 사이트를 자동 Chromium으로 촬영해 생성한 파일**입니다.

## 한계와 최종 단계

- 자동 Chromium 결과는 물리적 삼성 휴대전화·Windows PC 환경 전체의 작동을 보증하지 않습니다. 실제 기기에서 눈으로 확인된 부분은 위 표에 한정합니다.
- 자동 캡처에는 실제 사이트와 실제 공개 GitHub API 응답을 사용했습니다. 개발용 `qa-*-mock.png`는 제출하지 않습니다.
- 과제 제출 화면에 두 URL과 3장 이미지를 제출하고 **제출 완료 상태를 확인하는 절차는 남아 있습니다.**
