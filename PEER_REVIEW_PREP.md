# B1-1 동료평가 보완 정리

## 평가에서 확인된 핵심

기능 구현 자체는 동작한다는 평가를 받았지만, **코드가 어떤 방식으로 동작하는지 설명하는 부분**과 **배열 메서드(`map`, `filter` 등)의 개념 이해**를 더 보완할 필요가 있다는 피드백이 있었습니다.

이 문서는 그 피드백을 실제 `js/main.js` 코드와 연결해서 다시 설명하기 위한 학습 기록입니다. 평가자의 이름·이메일 등 개인정보는 기록하지 않았습니다.

## 1. 프로젝트 목록이 화면에 나타나는 전체 흐름

```text
GitHub API 요청
   ↓
fetch()
   ↓
response.json()
   ↓
STATE.projects에 저장
   ↓
renderProjectStatus()
   ↓
renderProjects()
   ↓
filter → sort → map → join
   ↓
projectList.innerHTML
   ↓
프로젝트 카드가 화면에 표시
```

이 흐름을 한 문장으로 설명하면 다음과 같습니다.

> GitHub에서 저장소 배열을 받아 상태에 저장한 뒤, 화면에 쓸 항목을 고르고 정렬하고 카드 HTML로 변환해서 프로젝트 영역에 넣습니다.

## 2. `filter()`

`filter()`는 배열의 항목을 하나씩 검사해서 **조건이 참인 항목만 남긴 새 배열**을 만듭니다.

이 프로젝트에서는 `renderProjects()` 안에서 저장소 데이터 중 화면에 사용할 수 있는 항목을 먼저 고릅니다.

```js
const visibleRepositories = repositories.filter(
  (repository) => repository && repository.name
);
```

여기서 원본 `repositories`를 직접 바꾸는 것이 아니라, 조건을 통과한 항목으로 `visibleRepositories`라는 새 배열을 만듭니다.

## 3. `map()`

`map()`은 배열의 각 항목을 **다른 형태로 바꾼 새 배열**을 만듭니다.

이 프로젝트에서는 저장소 객체 하나를 프로젝트 카드 HTML 문자열 하나로 바꿉니다.

```text
저장소 객체 1개 → 카드 HTML 1개
저장소 객체 2개 → 카드 HTML 2개
...
```

마지막의 `.join('')`은 여러 카드 문자열을 하나의 긴 문자열로 합칩니다.

## 4. `filter`와 `map`의 차이

```text
filter = 필요한 항목을 고른다.
map    = 각 항목의 모양을 바꾼다.
```

예를 들어 숫자 배열 `[1, 2, 3, 4]`가 있다면,

```js
[1, 2, 3, 4].filter((number) => number % 2 === 0)
// 결과: [2, 4]

[1, 2, 3, 4].map((number) => number * 10)
// 결과: [10, 20, 30, 40]
```

## 5. 이 프로젝트에서 함께 사용하는 배열 메서드

- `forEach()`: 여러 메뉴 링크나 입력칸 각각에 이벤트를 붙입니다.
- `find()`: 폼 오류가 생겼을 때 첫 번째 오류 입력칸 하나를 찾습니다.
- `sort()`: 프로젝트를 원하는 순서로 배치합니다.
- `filter()`: 조건에 맞는 저장소만 남깁니다.
- `map()`: 저장소 데이터를 프로젝트 카드 HTML로 바꿉니다.

## 6. 이벤트 → 상태 → 화면 변경

이 프로젝트의 JavaScript를 설명할 때 가장 중요한 구조입니다.

다크 모드 예시는 다음 순서입니다.

```text
사용자가 버튼 클릭
   ↓
click 이벤트 발생
   ↓
STATE.theme 변경
   ↓
applyTheme() 실행
   ↓
HTML의 data-theme 변경
   ↓
CSS의 다크 모드 변수 적용
   ↓
localStorage에 선택 저장
```

프로젝트 API도 같은 방식으로 볼 수 있습니다.

```text
페이지 실행
   ↓
loadProjects()
   ↓
STATE.projectStatus = loading
   ↓
로딩 화면
   ↓
fetch 성공 또는 실패
   ↓
STATE 변경
   ↓
renderProjectStatus()
   ↓
성공/빈 상태/오류 화면
```

## 7. 평가에서 바로 답할 수 있어야 하는 질문

1. `querySelector`와 `querySelectorAll`의 차이는?
2. `map()`과 `filter()`의 차이는?
3. 이 프로젝트에서 `map()`은 어디에 사용했는가?
4. 이 프로젝트에서 `filter()`는 어디에 사용했는가?
5. `forEach()`는 왜 사용하는가?
6. `find()`는 어디에 사용했는가?
7. `fetch()` 뒤에 `await response.json()`을 하는 이유는?
8. 프로젝트 목록의 로딩/성공/실패/빈 상태는 어떻게 연결되는가?
9. 다크 모드가 새로고침 후에도 유지되는 이유는?
10. `preventDefault()`를 왜 사용하는가?
11. `IntersectionObserver`가 스크롤 애니메이션에서 무슨 일을 하는가?
12. Flexbox와 Grid를 각각 어느 부분에서 사용했는가?

## 8. 30초 설명 연습

> 이 프로젝트는 HTML로 구조를 만들고 CSS로 반응형 배치와 테마를 설정했으며 JavaScript로 사용자 이벤트와 상태를 처리합니다. 프로젝트 영역은 GitHub API에서 저장소 배열을 받아 `filter`로 필요한 데이터를 고르고, `sort`로 순서를 정하고, `map`으로 각 저장소를 카드 HTML로 변환합니다. 다크 모드와 API 상태는 STATE에 저장한 뒤 화면을 다시 그리는 방식으로 연결했습니다.

## 재평가 전 체크

- [ ] `filter`와 `map`의 차이를 코드 없이 설명할 수 있다.
- [ ] `renderProjects()` 흐름을 위에서 아래로 설명할 수 있다.
- [ ] 다크 모드의 이벤트 → 상태 → 화면 변경을 설명할 수 있다.
- [ ] `fetch / async / await / try-catch`의 역할을 설명할 수 있다.
- [ ] 폼에서 `preventDefault()`와 `find()`의 역할을 설명할 수 있다.
- [ ] 스크롤 이벤트와 `IntersectionObserver`의 차이를 설명할 수 있다.
