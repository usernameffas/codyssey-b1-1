'use strict';
/* B1-1 보너스: 공개 프로젝트의 검색어와 언어를 함께 적용합니다. */
(() => {
  const list = document.querySelector('#project-list');
  const heading = document.querySelector('#projects .section-heading-row');
  if (!list || !heading) return;

  const toolbar = document.createElement('div');
  toolbar.className = 'project-toolbar';
  toolbar.innerHTML = `
    <label for="project-search">프로젝트 검색</label>
    <input id="project-search" type="search" placeholder="저장소 이름, 기술, 설명 검색" autocomplete="off" aria-controls="project-list">
    <div class="language-filters" role="group" aria-label="프로젝트 언어" hidden></div>
    <p id="project-search-count" aria-live="polite"></p>`;
  heading.insertAdjacentElement('afterend', toolbar);
  const input = toolbar.querySelector('input');
  const languageFilters = toolbar.querySelector('.language-filters');
  const count = toolbar.querySelector('#project-search-count');
  let selectedLanguage = '';

  function filterProjects() {
    const query = input.value.trim().toLocaleLowerCase();
    const cards = [...list.querySelectorAll('.project-card')];
    const visibleCards = new Set(cards.filter((card) => {
      const matchesLanguage = !selectedLanguage || card.dataset.language === selectedLanguage;
      const matchesQuery = card.textContent.toLocaleLowerCase().includes(query);
      return matchesLanguage && matchesQuery;
    }));
    cards.forEach((card) => {
      card.hidden = !visibleCards.has(card);
    });
    const previous = list.querySelector('.search-empty');
    if (previous) previous.remove();
    if (cards.length && visibleCards.size === 0) {
      const empty = document.createElement('p');
      empty.className = 'search-empty state-panel';
      empty.textContent = '검색 결과가 없습니다. 검색어나 언어를 바꿔 보세요.';
      list.append(empty);
    }
    count.textContent = cards.length ? `${visibleCards.size}개 표시 / 전체 ${cards.length}개` : '';
  }

  // ===== 검색어와 언어 필터링 끝 =====

  function markSelectedLanguage() {
    languageFilters.querySelectorAll('button').forEach((button) => {
      const selected = button.dataset.language === selectedLanguage;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('active', selected);
    });
  }

  function renderLanguageFilters() {
    const cards = [...list.querySelectorAll('.project-card')];
    const languages = [...new Set(cards.map((card) => card.dataset.language).filter(Boolean))].sort();
    if (!languages.includes(selectedLanguage)) selectedLanguage = '';
    languageFilters.hidden = languages.length === 0;
    languageFilters.replaceChildren();
    if (languageFilters.hidden) return;

    ['', ...languages].forEach((language) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'language-button';
      button.dataset.language = language;
      button.textContent = language || '전체 언어';
      button.setAttribute('aria-controls', 'project-list');
      languageFilters.append(button);
    });
    markSelectedLanguage();
  }

  // ===== 언어 선택 버튼 만들기 끝 =====

  const observer = new MutationObserver((changes) => {
    const cardsChanged = changes.some((change) =>
      [...change.addedNodes, ...change.removedNodes].some((node) => node.matches?.('.project-card'))
    );
    if (cardsChanged) {
      renderLanguageFilters();
      filterProjects();
    }
  });
  observer.observe(list, { childList: true });

  languageFilters.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    selectedLanguage = button.dataset.language;
    markSelectedLanguage();
    filterProjects();
  });
  input.addEventListener('input', filterProjects);
  renderLanguageFilters();
  filterProjects();
})();
// ===== B1-1 프로젝트 검색과 언어 필터 끝 =====
