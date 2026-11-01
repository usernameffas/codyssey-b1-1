'use strict';
/* Hero 제목에 타이핑 효과를 적용합니다.
   원본 문구를 보존하고, 모션 감소 설정이나 비활성 탭에서는 즉시 표시합니다. */
(() => {
  const target = document.querySelector('#hero-title .highlight');
  if (!target) return;
  const message = target.textContent;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // 초기 콘텐츠를 남겨두어 JavaScript 로딩이나 실행 실패 시에도 읽을 수 있습니다.
  target.setAttribute('aria-label', message);
  let index = 0;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    const timer = setInterval(() => {
      if (document.hidden) {
        target.textContent = message;
        clearInterval(timer);
        return;
      }
      index++;
      target.textContent = message.slice(0,index);
      if (index >= message.length) clearInterval(timer);
    }, 110);
  };
  // 첫 화면이 그려진 뒤 시작합니다.
  requestAnimationFrame(() => requestAnimationFrame(start));
})();