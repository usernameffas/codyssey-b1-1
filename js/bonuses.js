'use strict';
/* B1-1 공식 보너스 — 외부 프레임워크 없이 순수 JavaScript로 구현 */

/* 1. Hero 타이핑: 모션 줄이기 사용자는 전체 문장을 유지 */
const typingEl = document.querySelector('#hero-typing');
if (typingEl && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
  const fullText = typingEl.textContent;
  typingEl.textContent = '';
  typingEl.classList.add('is-typing');
  let nextChar = 0;
  const typingTimer = window.setInterval(() => {
    nextChar += 1;
    typingEl.textContent = fullText.slice(0, nextChar);
    if (nextChar === fullText.length) {
      clearInterval(typingTimer);
      typingEl.classList.remove('is-typing');
    }
  }, 80);
}

/* 2. 시스템 테마를 감지하되, 사용자가 직접 고른 테마를 우선 */
const systemTheme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
let manualTheme = false;
try {
  manualTheme = ['dark', 'light'].includes(localStorage.getItem('b11-theme'));
} catch (error) {
  console.info('로컬 테마 저장소를 사용할 수 없습니다.');
}
const followSystemTheme = () => {
  if (!manualTheme && systemTheme) {
    STATE.theme = systemTheme.matches ? 'dark' : 'light';
    applyTheme();
  }
};
followSystemTheme();
if (systemTheme) {
  if (systemTheme.addEventListener) systemTheme.addEventListener('change', followSystemTheme);
  else if (systemTheme.addListener) systemTheme.addListener(followSystemTheme);
}
themeToggle.addEventListener('click', () => { manualTheme = true; });

/* 3. GitHub 언어 필터: 기존 렌더 함수를 건드리지 않고 표시 상태만 조절 */
const languageFilters = document.querySelector('#project-filters');
let activeLanguage = 'all';
let projectLanguages = [];
const filterCards = () => {
  const cards = Array.from(projectList.querySelectorAll('.project-card'));
  const allowed = cards.filter((card) => activeLanguage === 'all' || card.dataset.language === activeLanguage);
  cards.forEach((card) => { card.hidden = !allowed.includes(card); });
  let emptyNotice = document.querySelector('#language-empty-notice');
  if (emptyNotice) emptyNotice.remove();
  if (cards.length && allowed.length === 0) {
    emptyNotice = document.createElement('p');
    emptyNotice.id = 'language-empty-notice';
    emptyNotice.className = 'state-panel';
    emptyNotice.textContent = '해당 언어의 프로젝트가 없습니다.';
    projectList.append(emptyNotice);
  }
};
const rebuildFilters = () => {
  const cards = Array.from(projectList.querySelectorAll('.project-card'));
  if (!cards.length) { languageFilters.hidden = true; return; }
  const repos = STATE.projects.filter((repo) => repo && repo.name);
  projectLanguages = ['all', ...new Set(repos.map((repo) => repo.language || 'Unknown'))];
  const languageByName = new Map(repos.map((repo) => [repo.name, repo.language || 'Unknown']));
  cards.forEach((card) => {
    const link = card.querySelector('h3 a');
    if (link) {
      const name = decodeURIComponent(link.pathname.split('/').pop());
      card.dataset.language = languageByName.get(name) || 'Unknown';
    }
  });
  if (activeLanguage !== 'all' && !projectLanguages.includes(activeLanguage)) activeLanguage = 'all';
  languageFilters.replaceChildren();
  projectLanguages.forEach((language) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-filter';
    button.textContent = language === 'all' ? '전체' : language;
    button.setAttribute('aria-pressed', String(language === activeLanguage));
    button.addEventListener('click', () => {
      activeLanguage = language;
      rebuildFilters();
      filterCards();
    });
    languageFilters.append(button);
  });
  languageFilters.hidden = projectLanguages.length <= 1;
  filterCards();
};
/* API 응답 이후 프로젝트 카드가 새로 렌더링되는 경우도 갱신 */
const projectObserver = new MutationObserver(() => {
  const cards = projectList.querySelectorAll('.project-card');
  if (cards.length && !cards[0].hasAttribute('data-language')) rebuildFilters();
});
projectObserver.observe(projectList, {childList:true, subtree:false});
if (projectList.querySelector('.project-card')) rebuildFilters();

/* 4. Formspree: 전송 endpoint 설정 전에는 기존 입력 검증만 수행 */
const configuredEndpoint = contactForm.dataset.formEndpoint?.trim() || '';
if (/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(configuredEndpoint)) {
  let sending = false;
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation(); // 기존 검증 전용 핸들러 중복 호출 방지
    if (sending) return;
    let valid = true;
    formFields.forEach((field) => {
      if (!validateField(field)) valid = false;
    });
    if (!valid) {
      STATE.formStatus = 'invalid';
      renderFormStatus();
      formFields.find((field) => STATE.formErrors[field.id]).focus();
      return;
    }
    const sendButton = contactForm.querySelector('button[type="submit"]');
    sending = true;
    sendButton.disabled = true;
    formStatus.textContent = '전송하는 중입니다...';
    formStatus.className = 'form-status';
    try {
      const response = await fetch(configuredEndpoint, {
        method:'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          name: document.querySelector('#contact-name').value.trim(),
          email: document.querySelector('#contact-email').value.trim(),
          message: document.querySelector('#contact-message').value.trim()
        })
      });
      if (!response.ok) throw new Error('Formspree status ' + response.status);
      formStatus.textContent = '메시지 전송이 접수되었습니다.';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } catch (error) {
      console.warn('메시지 전송에 실패했습니다.', error);
      formStatus.textContent = '전송이 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.';
      formStatus.className = 'form-status error';
    } finally {
      sendButton.disabled = false;
      sending = false;
    }
  }, {capture:true});
}
