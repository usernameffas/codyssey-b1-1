'use strict';

/* =============================================================
 * B1-1: 순수 JavaScript만 사용합니다. React, jQuery, 외부 라이브러리 없음.
 * 제출 전 GitHub 아이디가 다르면 아래 한 줄을 본인 계정으로 바꾸세요.
 * 공개 저장소 목록만 읽으므로 GitHub 토큰/비밀번호는 사용하지 않습니다.
 * ============================================================= */
const GITHUB_USERNAME = 'usernameffas';
const API_RETRY_INTERVAL_MS = 10000; // 인증 없는 API에 연속 요청하지 않도록 10초 간격 제한

// querySelector: HTML 요소 하나를 찾습니다. querySelectorAll: 여러 요소를 찾습니다.
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const menuToggle = document.querySelector('#menu-toggle');
const siteNavigation = document.querySelector('#site-navigation');
const header = document.querySelector('#page-header');
const backToTop = document.querySelector('#back-to-top');
const projectList = document.querySelector('#project-list');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

/* 1. 다크 모드: 클릭 이벤트 → theme 상태 → 화면 속성 변경 → localStorage 저장 */
let theme = 'light';
try {
  const savedTheme = localStorage.getItem('b11-theme');
  if (savedTheme === 'dark') theme = 'dark';
} catch (error) {
  // 브라우저의 저장소 접근이 차단되어도 테마 버튼 자체는 동작합니다.
  console.info('테마 저장소를 사용할 수 없어 현재 탭에서만 테마를 적용합니다.');
}

const applyTheme = () => {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  themeToggle.setAttribute('aria-label', theme === 'dark' ? '라이트 모드 켜기' : '다크 모드 켜기');
  themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
};
applyTheme();
themeToggle.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  applyTheme();
  try {
    localStorage.setItem('b11-theme', theme);
  } catch (error) {
    console.info('테마 변경은 적용되었지만 저장소에는 저장하지 못했습니다.');
  }
});

/* 2. 모바일 햄버거 메뉴: active 클래스로 표시 상태를 전환합니다. */
const closeMenu = () => {
  siteNavigation.classList.remove('active');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '메뉴 열기');
};
menuToggle.addEventListener('click', () => {
  const isOpen = siteNavigation.classList.toggle('active');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});
// 메뉴의 각 링크를 누르면 메뉴를 닫습니다. 실제 이동은 HTML 앵커 + CSS가 담당합니다.
document.querySelectorAll('.nav-links a, .logo').forEach((link) => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
// 모바일에서 열린 채로 화면을 넓혀도 상태값이 남지 않도록 정리합니다.
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMenu();
});

/* 3. 스크롤 이벤트: 60px 이후 헤더 색상, 300px 이후 맨 위로 버튼 */
const updateScrollUI = () => {
  header.classList.toggle('scrolled', window.scrollY >= 60);
  backToTop.classList.toggle('visible', window.scrollY >= 300);
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* 4. 스크롤 등장 효과: IntersectionObserver로 화면에 들어온 영역만 표시 */
const revealTargets = document.querySelectorAll('.reveal-target');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 나타난 뒤 관찰 종료: 불필요한 반복 방지
      }
    });
  }, { threshold: 0.2 });
  revealTargets.forEach((target) => {
    target.classList.add('js-reveal');
    revealObserver.observe(target);
  });
}

/* 5. GitHub API: 로딩 → 성공/빈 데이터/에러 중 하나의 상태로 렌더링 */
const profileUrl = `https://github.com/${encodeURIComponent(GITHUB_USERNAME)}`;
document.querySelectorAll('#github-profile-link, #contact-github-link, #footer-github-link').forEach((link) => {
  link.href = profileUrl;
});
// API 응답 텍스트를 innerHTML에 넣을 때 특수 문자를 이스케이프해 HTML 삽입을 방지합니다.
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

// 상태 화면 역시 재사용할 수 있는 한 함수로 생성합니다.
const renderState = (message, showRetry = false, isLoading = false) => {
  const icon = isLoading ? '<span class="spinner" aria-hidden="true"></span>' : '';
  const retry = showRetry ? '<button class="button button-secondary" id="retry-projects" type="button">다시 시도</button>' : '';
  projectList.innerHTML = `<div class="state-panel ${isLoading ? 'loading-state' : ''}">${icon}<p>${escapeHtml(message)}</p>${retry}</div>`;
  if (showRetry) {
    document.querySelector('#retry-projects').addEventListener('click', loadProjects);
  }
};

// map: 저장소 객체들의 배열을 HTML 카드 문자열들의 배열로 바꾸는 메서드입니다.
const renderProjects = (repositories) => {
  if (repositories.length === 0) {
    renderState('표시할 프로젝트가 없습니다. 공개 저장소를 만들면 여기에 나타납니다.');
    return;
  }
  projectList.innerHTML = repositories.map(({ name, description, language, stargazers_count: stars }) => {
    const url = `${profileUrl}/${encodeURIComponent(name)}`;
    return `
      <article class="project-card">
        <div class="project-card-top"><span>PUBLIC REPOSITORY</span><span aria-hidden="true">↗</span></div>
        <h3><a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)} ↗</a></h3>
        <p>${escapeHtml(description || '저장소에 등록된 설명이 없습니다.')}</p>
        <div class="project-meta"><span>● ${escapeHtml(language || '언어 정보 없음')}</span><span>★ ${Number.isFinite(stars) ? stars : 0}</span></div>
      </article>`;
  }).join('');
};

let isLoading = false; // 현재 요청이 진행 중인지 기억하는 상태 변수
let lastRequestAt = 0;
async function loadProjects() {
  if (isLoading) return; // 연속 클릭으로 중복 요청하는 상황을 방지합니다.
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < API_RETRY_INTERVAL_MS) {
    const wait = Math.ceil((API_RETRY_INTERVAL_MS - elapsed) / 1000);
    renderState(`요청 제한을 피하기 위해 ${wait}초 후 다시 시도해 주세요.`, true);
    return;
  }
  isLoading = true;
  lastRequestAt = Date.now();
  renderState('프로젝트를 불러오는 중...', false, true);
  try {
    // fetch/await: 응답을 기다리는 동안 브라우저의 나머지 동작은 계속됩니다.
    const url = `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=100&type=owner`;
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (response.status === 403 || response.status === 429) {
      throw new Error('GitHub API 요청 제한(403/429)에 도달했습니다. 잠시 후 다시 시도해 주세요.');
    }
    if (!response.ok) {
      throw new Error(`GitHub 응답 오류 (${response.status}). 계정명 또는 네트워크를 확인해 주세요.`);
    }
    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error('GitHub에서 받은 데이터 형식이 예상과 다릅니다.');
    }
    renderProjects(repositories);
  } catch (error) {
    // 오류를 화면에 표시하므로 사용자는 개발자 도구를 열지 않아도 알 수 있습니다.
    renderState(`프로젝트를 불러올 수 없습니다. ${error.message}`, true);
  } finally {
    isLoading = false;
  }
}
loadProjects(); // 페이지가 시작될 때 한 번만 자동 호출합니다.

/* 6. 문의 폼: input → 검증 상태 → 필드 주변 오류 표시 / 성공 메시지 */
const nameField = document.querySelector('#contact-name');
const emailField = document.querySelector('#contact-email');
const messageField = document.querySelector('#contact-message');
const formFields = [nameField, emailField, messageField];
const errors = {
  'contact-name': document.querySelector('#name-error'),
  'contact-email': document.querySelector('#email-error'),
  'contact-message': document.querySelector('#message-error')
};

const validateField = (field) => {
  const value = field.value.trim();
  let message = '';
  if (!value) {
    message = `${field.labels[0].textContent.trim().replace('*', '')} 항목을 입력해 주세요.`;
  } else if (field === emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = '이메일 형식을 확인해 주세요. (예: name@example.com)';
  }
  errors[field.id].textContent = message;
  field.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
};

// 입력 중에는 해당 항목의 오류를 즉시 갱신합니다.
formFields.forEach((field) => {
  field.addEventListener('input', () => {
    validateField(field);
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  });
});
contactForm.addEventListener('submit', (event) => {
  event.preventDefault(); // 페이지 새로고침/실제 폼 전송을 막습니다.
  let allValid = true;
  formFields.forEach((field) => {
    if (!validateField(field)) allValid = false;
  });
  if (!allValid) {
    formStatus.textContent = '입력값을 확인해 주세요. 오류가 표시된 항목을 수정하면 됩니다.';
    formStatus.className = 'form-status error';
    formFields.find((field) => field.getAttribute('aria-invalid') === 'true').focus();
    return;
  }
  // 선택 보너스인 실제 이메일 전송은 구현하지 않았으므로 성공 메시지를 정확히 표현합니다.
  formStatus.textContent = '입력 검증이 완료되었습니다. 이 양식은 학습용이므로 실제 메시지는 전송되지 않습니다.';
  formStatus.className = 'form-status success';
});