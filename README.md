# 코디세이 B1-1 | 나를 소개하는 웹페이지 처음부터 만들기

순수 HTML, CSS, JavaScript로 만든 반응형 개인 포트폴리오 웹사이트입니다. 외부 UI 프레임워크를 사용하지 않았으며 보너스 기능은 제외했습니다. 기존 코디세이 E1 과제 경험을 바탕으로 익명의 소개를 구성했습니다.

## 프로젝트 구성

```text
index.html          웹페이지 구조 및 시맨틱 섹션
css/style.css       디자인 변수, 모바일 우선 반응형, 다크 모드
js/main.js         테마·메뉴·스크롤·GitHub API·폼 입력 검증
images/profile.svg  기본 프로필 일러스트
README.md           프로젝트 설명, 실행 및 검사
```

## 실행 방법

웹브라우저에서 `index.html`을 열어 레이아웃을 확인할 수 있습니다. API와 브라우저 저장 기능을 함께 확인하려면 로컬 웹서버 또는 이 저장소의 GitHub Pages 주소를 사용합니다. Windows에서는 VS Code Live Server를 이용할 수 있습니다. Android에서는 배포된 Pages 주소를 Chrome 또는 삼성 인터넷으로 엽니다. GitHub 계정과 접근 토큰은 코드에 입력할 필요가 없습니다.

## 기능 구현 요약

- Hero, About, Skills, Projects, Contact, Footer의 여섯 영역과 시맨틱 HTML 및 내부 링크
- CSS Flexbox/Grid, 모바일 우선 구조, 768px 태블릿과 1024px 데스크톱 미디어 쿼리
- 햄버거 메뉴, 클릭 후 닫힘, Escape 닫기, 화면 크기 변경 시 상태 초기화
- 다크 모드 버튼, `data-theme` 변수, `localStorage`를 사용한 테마 저장
- 스크롤 위치별 헤더 상태, 맨 위로 버튼, 부드러운 이동과 등장 애니메이션
- `fetch` 및 `async/await`로 GitHub 공개 저장소 API 호출, 성공/로딩/빈 목록/오류 처리
- 문의 양식의 이름·이메일·메시지 입력 검증 및 오류 메시지, 실제 이메일 전송은 선택 보너스이므로 제외
- 접근성: 적절한 `label`, 대체 텍스트, 키보드 포커스, `aria-*` 상태, 움직임 축소 설정

## GitHub 프로젝트 표시

`js/main.js`의 `GITHUB_USERNAME` 변수를 기반으로 `https://api.github.com/users/{username}/repos`에 요청합니다. 현재 `usernameffas`로 설정되어 있습니다. 공개 저장소 목록이 없는 경우, 응답이 실패한 경우, API 호출이 제한된 경우를 구분해 사용자에게 안내합니다. API 응답 문자열을 HTML로 삽입할 때 특수 문자를 이스케이프합니다.

## 문의 양식 안내

이 과제의 필수 기능은 이름/이메일/메시지의 입력 검증입니다. 유효한 데이터를 입력하면 검증 완료 메시지를 표시하며 실제 메시지는 전송되지 않습니다. 연락처를 서버에 저장하지 않습니다.

## 검증 상태

개발 작업본에서 구조/문법 정적 검사 및 모의 GitHub API 기반 브라우저 검사를 진행했습니다. 실제 배포 사이트의 API 응답·모바일 화면·저장 기능은 **Pages 게시 이후 실제 접속하여 확인해야 합니다.** 모의 테스트 화면은 제출용 배포 화면으로 사용하지 않습니다.

## GitHub Pages 게시

이 저장소의 **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**로 설정합니다. 이후 Pages 화면의 `Visit site`를 눌러 실제 게시 상태를 확인합니다. 저장소 주소: https://github.com/usernameffas/codyssey-b1-1 . 사이트 예상 주소: https://usernameffas.github.io/codyssey-b1-1/ (실제로 열리기 전에는 게시 완료로 표기하지 않음).

## 제출 전 확인

- 모바일·데스크톱 실제 화면, 다크 모드 전환, 메뉴, 스크롤, GitHub 카드 및 문의 오류를 게시 주소에서 확인합니다.
- 실제 게시 화면을 캡처하여 제출 자료에 사용합니다. 개인정보·토큰·비밀번호가 캡처에 포함되지 않도록 확인합니다.
- GitHub 저장소 URL과 실제 접속 가능한 Pages URL을 과제 제출 화면에 입력합니다.

> 본 소개 문구와 프로필 이미지는 익명 기본값입니다. 실제 포트폴리오로 사용하려면 개인적으로 공개할 정보만 선택해 변경하세요.
