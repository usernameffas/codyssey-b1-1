# B1-1 코드 공부: 실행하면서 10분씩 이해하기

이 문서는 PDF 3쪽 과제 목표인 **구조 → 스타일 → 사용자 이벤트 → 화면 변경 → API 요청**을 실제 소스에 붙여 설명합니다. 코드를 암기하기보다는 파일을 열어 아래 구간을 직접 찾아보세요.

## 1. HTML: 무엇을 보여 줄까? (`index.html`)

`<header>`는 머리글, `<nav>`는 메뉴, `<main>`은 본문, `<section>`은 개별 주제, `<footer>`는 하단입니다. `<section id="projects">`는 프로젝트 영역에 고유 이름을 붙이는 동작입니다. 메뉴의 `<a href="#projects">`는 그 이름을 찾아 이동합니다.

**확인할 것:** `id="contact"`와 `href="#contact"`가 연결되는 위치를 찾으세요.

## 2. CSS: 어떻게 배치할까? (`css/style.css`)

`:root`는 공통 색상 변수들을 저장합니다. `[data-theme="dark"]`는 어두운 모드일 때 변수 값만 바꿉니다. `.header-inner`의 `display: flex`는 로고/메뉴를 일렬 배치하고, `.project-grid`의 `display: grid`는 카드를 여러 열에 배치합니다. `auto-fit`과 `minmax` 덕분에 화면이 좁아지면 카드 열 수가 자동으로 줄어듭니다.

**확인할 것:** `@media (min-width: 768px)`와 `1024px`에서 무엇이 달라지는지 살펴보세요.

## 3. JS로 요소 찾기 (`js/main.js`)

`document.querySelector('#theme-toggle')`은 `id="theme-toggle"` 버튼을 찾습니다. `document.querySelectorAll('.nav-links a')`는 메뉴 링크들을 모두 찾습니다. `const`는 다시 대입하지 않을 변수에, `let`은 값이 바뀌는 상태 변수(`theme`, `isLoading`)에 씁니다.

**확인할 것:** HTML의 `project-list`가 JS의 어느 변수에 저장되는지 찾아보세요.

## 4. 클릭 → 상태 변경 → 스타일 변경 (다크 모드)

`addEventListener('click', ...)`은 클릭 발생 시 함수를 실행합니다. `theme = theme === 'light' ? 'dark' : 'light'`는 상태를 바꾸고, `applyTheme()`은 `data-theme` 속성을 수정합니다. 그러면 CSS의 다크 모드 변수가 적용됩니다. `localStorage.setItem()`으로 선택을 저장하고, 다음 실행에서 `getItem()`으로 불러옵니다.

**확인할 것:** 버튼 클릭 → `theme` 변경 → `applyTheme` → CSS 순서로 따라가 보세요.

## 5. 햄버거 메뉴/스크롤

`classList.toggle('active')`는 클래스가 없으면 넣고 있으면 뺍니다. 모바일 메뉴가 열리는 원리입니다. `scroll` 이벤트에서는 `window.scrollY`가 60 이상이면 헤더에 `scrolled`, 300 이상이면 버튼에 `visible` 클래스를 붙입니다. `IntersectionObserver`는 화면에 섹션이 들어오는 것을 감지하고 `visible` 클래스를 붙입니다.

**확인할 것:** `.back-to-top.visible`의 스타일과 `backToTop.classList.toggle`을 연결하세요.

## 6. GitHub API: 인터넷에서 데이터를 가져오기

`fetch(url)`은 GitHub 서버로 요청을 보냅니다. `await`는 응답이 올 때까지 해당 함수의 다음 코드를 기다립니다. `response.ok`를 검사하고 `response.json()`으로 JSON을 JS 객체로 변환합니다. `repositories.map(...)`이 각 저장소를 카드 문자열로 변환하고 `innerHTML`이 화면을 갱신합니다. 외부에서 온 텍스트는 `escapeHtml()`을 거치게 하여 HTML 주입을 방지합니다.

**네 가지 화면:** 로딩(요청 중) / 성공(카드 표시) / 에러(요청 실패·403) / 빈 상태(목록이 0개). 재시도는 중복 요청과 10초 내 반복 호출을 제한합니다.

**확인할 것:** `loadProjects()` → `fetch()` → `renderProjects()` 또는 `renderState()` 흐름을 따라가세요.

## 7. 문의 양식: 입력 → 오류 상태 → 화면 갱신

`event.preventDefault()`는 기본 폼 제출과 페이지 이동을 막습니다. `validateField()`는 공백과 이메일 형식을 검사해 입력칸 옆의 `field-error` 내용을 바꿉니다. 모든 입력이 유효하면 검증 완료를 표시합니다. 실제 전송은 선택 보너스이며 이번 과제에서는 하지 않습니다.

**확인할 것:** 빈 상태로 보내기 → `validateField` → `aria-invalid` → `.field-error` 순서로 살펴보세요.

## 제출 직전 스스로 답해 보기

1. `header`, `nav`, `main`을 그냥 `div` 대신 사용하는 이유는 무엇일까요?
2. Flexbox는 어느 부분에, Grid는 어느 부분에 사용했나요?
3. `querySelector`와 `querySelectorAll`의 차이는 무엇인가요?
4. 테마 설정이 새로고침 이후에도 유지되는 과정은?
5. 사용자가 프로젝트 페이지를 열면 `fetch → 로딩/성공/실패/빈 상태`가 어떻게 연결되나요?
6. 브라우저 폼 검증에서 `preventDefault()`를 쓰는 이유는 무엇인가요?

정답 힌트는 `README.md`와 소스의 번호 붙은 주석입니다.
