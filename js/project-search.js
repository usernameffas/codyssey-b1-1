'use strict';
/* B1-1 보너스: API에서 받은 프로젝트 목록을 클라이언트에서 검색합니다. */
(() => {
  const list = document.querySelector('#project-list');
  const heading = document.querySelector('#projects .section-heading-row');
  if (!list || !heading) return;

  const toolbar = document.createElement('div');
  toolbar.className = 'project-toolbar';
  toolbar.innerHTML = '<label for="project-search">프로젝트 검색</label><input id="project-search" type="search" placeholder="저장소 이름, 기술, 설명 검색" autocomplete="off" aria-controls="project-list"><p id="project-search-count" aria-live="polite"></p>';
  heading.insertAdjacentElement('afterend', toolbar);
  const input = toolbar.querySelector('input');
  const count = toolbar.querySelector('#project-search-count');

  function filterProjects() {
    const query = input.value.trim().toLocaleLowerCase();
    const cards = [...list.querySelectorAll('.project-card')];
    let visible = 0;
    cards.forEach((card) => {
      const matches = card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visible++;
    });
    const previous = list.querySelector('.search-empty');
    if (previous) previous.remove();
    if (cards.length && !visible) {
      const empty = document.createElement('p');
      empty.className = 'search-empty state-panel';
      empty.textContent = '검색 결과가 없습니다. 다른 검색어를 입력해 주세요.';
      list.append(empty);
    }
    count.textContent = cards.length ? `${visible}개 표시 / 전체 ${cards.length}개` : '';
  }

  // 기존 GitHub API 코드가 프로젝트를 새로 그려도 필터를 유지합니다.
  const observer = new MutationObserver((mutations) => {
    if (mutations.some((change) => [...change.addedNodes].some((node) => node.nodeType === 1 && (node.matches?.('.project-card') || node.querySelector?.('.project-card'))))) {
      filterProjects();
    } else if (!list.querySelector('.project-card')) {
      count.textContent = '';
    }
  });
  observer.observe(list, {childList:true});
  input.addEventListener('input', filterProjects);
  filterProjects();
})();
