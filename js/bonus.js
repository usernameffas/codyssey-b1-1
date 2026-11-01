'use strict';
// ===== 1. Hero 두 줄 타이핑 효과 시작 =====
(() => {
  const target = document.querySelector('#hero-typing');
  if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const first = '웹을 만드는 과정을';
  const second = '배우고 있습니다.';
  const total = first.length + second.length;
  let index = 0;
  target.setAttribute('aria-label', first + ' ' + second);
  const render = () => {
    const firstVisible = first.slice(0, Math.min(index, first.length));
    const secondVisible = second.slice(0, Math.max(0, index - first.length));
    // textContent로 안전하게 글자를 갱신하며, HTML 줄바꿈 요소는 유지합니다.
    firstNode.textContent = firstVisible;
    secondNode.textContent = secondVisible;
  };
  const firstNode = target.querySelector('.highlight');
  const secondNode = target.querySelector('.hero-typing-second');
  if (!firstNode || !secondNode) return;
  firstNode.textContent = '';
  secondNode.textContent = '';
  target.classList.add('typing-active');
  const timer = setInterval(() => {
    if (document.hidden) index = total;
    else index = Math.min(total, index + 1);
    render();
    if (index >= total) {
      clearInterval(timer);
      target.classList.remove('typing-active');
    }
  }, 120);
})();
// ===== 1. Hero 두 줄 타이핑 효과 끝 =====

/* 상태 UI 테스트: GitHub API 요청을 다시 보내지 않고 DOM에 미리보기만 보여 줍니다. */
(() => {
  const list = document.querySelector('#project-list');
  const section = document.querySelector('#projects .container');
  if (!list || !section) return;
  const demo = document.createElement('div');
  demo.className = 'state-demo-controls';
  demo.innerHTML = '<span>상태 UI 테스트</span><button type="button" data-test="loading">스피너 보기 (3초)</button><button type="button" data-test="error">오류 보기</button><button type="button" data-test="empty">빈 상태 보기</button><button type="button" data-test="restore">원래 화면</button><div class="state-demo-preview" role="status" aria-live="polite" hidden></div>';
  list.insertAdjacentElement('beforebegin',demo);
  const preview = demo.querySelector('.state-demo-preview');
  let timer;
  const reset = () => {
    clearTimeout(timer);
    preview.hidden = true;
    preview.replaceChildren();
  };
  demo.addEventListener('click',event => {
    const kind = event.target.closest('button')?.dataset.test;
    if (!kind) return;
    reset();
    if (kind === 'restore') return;
    preview.hidden = false;
    if (kind === 'loading') {
      preview.innerHTML = '<div class="state-panel loading-state"><span class="spinner" aria-hidden="true"></span><p>프로젝트를 불러오는 중...</p></div>';
      timer=setTimeout(reset,3000);
    } else if (kind === 'error') {
      preview.innerHTML = '<div class="state-panel"><p>프로젝트를 불러올 수 없습니다. (오류 상태 테스트)</p><button type="button" class="button button-secondary" data-test="restore">닫기</button></div>';
    } else if (kind === 'empty') {
      preview.innerHTML = '<div class="state-panel"><p>표시할 프로젝트가 없습니다. (빈 상태 테스트)</p></div>';
    }
  });
})(); // ===== 상태 UI 테스트 끝 =====
