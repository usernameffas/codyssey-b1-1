'use strict';
/* Hero 타이핑 효과. 원문은 HTML에 남아 JS 실패 시 그대로 보입니다. */
(() => {
  const target = document.querySelector('#hero-title .highlight');
  if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const message = target.textContent.trim();
  target.setAttribute('aria-label',message);
  target.textContent = '';
  target.classList.add('typing-active');
  let i = 0;
  const timer = setInterval(() => {
    if (document.hidden) {
      target.textContent = message;
      target.classList.remove('typing-active');
      clearInterval(timer);
      return;
    }
    target.textContent = message.slice(0, ++i);
    if (i >= message.length) {
      target.classList.remove('typing-active');
      clearInterval(timer);
    }
  }, 120);
})();

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
})();