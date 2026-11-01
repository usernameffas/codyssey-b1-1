'use strict';
// 언어별 필터: API가 만든 카드의 .project-meta에서 언어를 읽어 버튼을 표시합니다.
(() => {
  const list = document.querySelector('#project-list');
  const toolbar = document.querySelector('.project-toolbar');
  if (!list || !toolbar) return;
  const buttons = document.createElement('div');
  buttons.className = 'language-filters';
  buttons.setAttribute('aria-label', '프로그래밍 언어 필터');
  toolbar.append(buttons);
  let active = '전체';
  const update = () => {
    const cards = [...list.querySelectorAll('.project-card')];
    const langs = [...new Set(cards.map(card => card.querySelector('.project-meta span')?.textContent.replace(/^●\\s*/, '').trim() || '언어 정보 없음'))].sort();
    const values = ['전체', ...langs];
    if (cards.length === 0) { buttons.replaceChildren(); return; }
    if (!values.includes(active)) active = '전체';
    buttons.replaceChildren(...values.map(language => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = language;
      button.className = 'language-button' + (language === active ? ' active' : '');
      button.setAttribute('aria-pressed', String(language === active));
      button.addEventListener('click', () => {
        active = language;
        update();
      });
      return button;
    }));
    const query = document.querySelector('#project-search')?.value.trim().toLocaleLowerCase() || '';
    cards.forEach(card => {
      const lang = card.querySelector('.project-meta span')?.textContent.replace(/^●\\s*/, '').trim() || '언어 정보 없음';
      card.hidden = (active !== '전체' && lang !== active) || !card.textContent.toLocaleLowerCase().includes(query);
    });
    const found = cards.filter(card => !card.hidden).length;
    const count = document.querySelector('#project-search-count');
    if (count) count.textContent = `${found}개 표시 / 전체 ${cards.length}개`;
    const empty = list.querySelector('.search-empty');
    if (empty) empty.remove();
    if (!found) {
      const p = document.createElement('p');
      p.className = 'search-empty state-panel';
      p.textContent = '조건에 맞는 프로젝트가 없습니다.';
      list.append(p);
    }
  };
  // 기존 검색 기능이 먼저 DOM을 갱신하므로 다음 프레임에 통합 필터를 적용합니다.
  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; update(); });
  };
  new MutationObserver(changes => {
    if (changes.some(c => [...c.addedNodes].some(n => n.nodeType === 1 && (n.matches?.('.project-card') || n.querySelector?.('.project-card'))))) schedule();
  }).observe(list, {childList:true});
  document.querySelector('#project-search')?.addEventListener('input', schedule);
  schedule();
})();
// 타자기 효과: 접근성을 위해 원래 제목은 보존하고 보조 문구에만 적용합니다.
(() => {
  const target = document.querySelector('.hero-description');
  if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const message = target.textContent.trim();
  target.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    target.textContent = message.slice(0, ++i);
    if (i >= message.length) clearInterval(timer);
  }, 28);
})();
