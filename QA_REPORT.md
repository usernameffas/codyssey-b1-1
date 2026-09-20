# B1-1 검증 기록 — 2026-09-20

## 실제 확인한 결과

1. 소스의 필수 파일·시맨틱 구조·이벤트·상태 처리 정적 검사 통과.
2. `node --check js/main.js` 문법 검사 통과.
3. Chromium에서 HTML/CSS/JS를 메모리에 로드하고 시험용 GitHub API 응답을 넣어 기능 검사 **19/19 통과**. 점검 범위는 모바일(390px)·태블릿(768px)·데스크톱(1280px) 가로 넘침, 여섯 영역, 메뉴 열기/닫기, 다크 모드, 헤더/상단 버튼, 폼 오류·정상 상태, API 성공·빈 목록·403·500 및 미처리 예외입니다.
4. GitHub 공개 저장소에 코드 업로드 확인: https://github.com/usernameffas/codyssey-b1-1
5. GitHub Pages의 `build`, `report-build-status`, `deploy` 세 작업이 모두 `success`인 기록을 확인: https://github.com/usernameffas/codyssey-b1-1/actions/runs/35491915502
6. 사용자가 휴대전화에서 사이트가 열린다고 확인: https://usernameffas.github.io/codyssey-b1-1/

## 시험 범위와 미확인 사항

- 브라우저 기능 시험의 API는 모의 응답이므로 실제 GitHub API 응답 확인을 대체하지 않습니다.
- 테스트 환경의 브라우저가 로컬 HTTP 및 file 탐색을 차단하여 HTML·CSS·JS를 메모리에 삽입했습니다. 실제 배포 도메인을 자동 브라우저로 직접 조작하는 데 성공한 결과가 아닙니다.
- Pages 배포 성공과 모바일 접속 성공은 확인했지만 실제 휴대전화에서 프로젝트 카드·다크 모드 재접속 유지·문의 양식·메뉴와 스크롤 기능을 모두 직접 시험한 기록은 없습니다.
- `qa-*-mock.png`는 Chromium으로 실행한 개발용 참고 이미지이며 모의 API 화면입니다. 실제 게시 화면 캡처처럼 표기하거나 제출하지 않습니다.

## 실제 제출 화면

배포 사이트를 휴대전화 브라우저에서 열어 `mobile.png` 및 `dark.png`를 촬영하고, 데스크톱 레이아웃 화면 `desktop.png`까지 확보하여 `docs/screenshots/`에 보관합니다. 실제 캡처 파일이 업로드되기 전에는 완료로 표시하지 않습니다. 제출 상태는 [CHECKLIST.md](CHECKLIST.md)를 참고합니다.
