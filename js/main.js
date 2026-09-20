'use strict';

/* =============================================================
 * B1-1: 순수 JavaScript만 사용합니다. React, jQuery, 외부 라이브러리 없음.
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

/* 2. 모바일 메뉴: 상태를 class와 aria-expanded에 함께 반영 */
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
document.querySelectorAll('.nav-links a, .logo').forEach((link) => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
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

/* 4. 스크롤 등장 효과: 화면에 들어온 섹션을 한 번만 표시 */
const revealTargets = document.querySelectorAll('.reveal-target');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealTargets.forEach((target) => {
    target.classList.add('js-reveal');
    revealObserver.observe(target);
  });
}

/* 5. GitHub API: 로딩 → 성공/빈 목록/오류로 표시 상태를 전환 */
const profileUrl = `https://github.com/${encodeURIComponent(GITHUB_USERNAME)}`;
document.querySelectorAll('#github-profile-link, #contact-github-link, #footer-github-link').forEach((link) => {
  link.href = profileUrl;
});
// API에서 받은 문자열을 HTML에 넣기 전에 이스케이프합니다.
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

const renderState = (message, showRetry = false, isLoading = false) => {
  const icon = isLoading ? '<span class="spinner" aria-hidden="true"></span>' : '';
  const retry = showRetry ? '<button class="button button-secondary" id="retry-projects" type="button">다시 시도</button>' : '';
  projectList.innerHTML = `<div class="state-panel ${isLoading ? 'loading-state' : ''}">${icon}<p>${escapeHtml(message)}</p>${retry}</div>`;
  if (showRetry) {
    document.querySelector('#retry-projects').addEventListener('click', loadProjects);
  }
};

/* GitHub About의 Description을 카드 소개로 우선 표시합니다.
 * Description이 비어 있으면 README에 근거해 정리한 소개를 표시합니다.
 */
const projectStories = {
  'codyssey-e1-1': [
    ['목적', '개발 환경을 구성하고 터미널·컨테이너·Git의 기본 사용법을 익히기 위해 진행한 실습입니다.'],
    ['기술', 'macOS와 OrbStack, Ubuntu 24.04, Docker·NGINX, Shell 스크립트와 Git/GitHub를 사용했습니다.'],
    ['구현', 'Dockerfile로 웹 서버 이미지를 빌드하고 포트 연결, 바인드 마운트, 볼륨의 데이터 유지 기능을 확인했습니다.'],
    ['결과', '실행 로그와 화면 캡처를 정리하고 공용 Mac의 관리자 권한 제한에 맞춘 설정 스크립트도 만들었습니다.']
  ],
  'codyssey-e1-2': [
    ['목적', 'Python 기초 문법을 문제로 복습할 수 있는 터미널 퀴즈 게임을 만들었습니다.'],
    ['기술', 'Python의 클래스·조건문·반복문과 표준 라이브러리 json/pathlib, Git을 사용했습니다.'],
    ['구현', '문제 풀이·추가·목록·최고 점수 메뉴를 제공하고 state.json에 데이터를 저장해 재실행 후에도 유지합니다.'],
    ['결과', '기본 문제 5개와 잘못된 입력·손상된 JSON 복구 기능을 구현하고 검사 스크립트로 형식을 확인했습니다.']
  ],
  'codyssey-e1-3': [
    ['목적', 'AI 연산의 기초인 곱셈·누적(MAC)을 이해하기 위한 미니 NPU 시뮬레이터를 제작했습니다.'],
    ['기술', 'Python 표준 라이브러리와 이중 반복문으로 배열 계산을 구현하고 JSON·시간 측정·허용 오차 비교를 사용했습니다.'],
    ['구현', '3×3 입력과 공식 데이터의 Cross/X 판정, 판정 불가 처리, 크기별 연산 횟수와 평균 시간을 출력합니다.'],
    ['결과', '공식 데이터 6건 중 3건은 PASS, 3건은 허용 오차에 따른 동점 처리로 FAIL이었으며 경위를 README에 기록했습니다.']
  ],
  'codyssey-b1-1': [
    ['목적', 'HTML·CSS·JavaScript를 학습하며 실습 결과를 한 페이지에 정리하고 모바일에서도 볼 수 있는 개인 포트폴리오를 만들었습니다.'],
    ['기술', '시맨틱 HTML, CSS Flexbox·Grid와 반응형 스타일, JavaScript DOM·이벤트·GitHub API, GitHub Pages를 사용했습니다.'],
    ['구현', '소개·기술·프로젝트·문의 영역과 모바일 메뉴, 다크 모드, 공개 GitHub 저장소 자동 목록, 문의 양식의 입력 검증을 구현했습니다.'],
    ['결과', '공개 사이트로 배포하고 데스크톱·모바일 자동 브라우저 검사를 진행했습니다. 문의 양식은 학습용 입력 검증 기능을 제공합니다.']
  ]
};
const featuredProjectNames = ['codyssey-e1-1', 'codyssey-e1-2', 'codyssey-e1-3', 'codyssey-b1-1'];

// 배열 복사 후 정렬하므로 GitHub API 원본 배열은 변경하지 않습니다.
const renderProjects = (repositories) => {
  if (repositories.length === 0) {
    renderState('표시할 프로젝트가 없습니다. 공개 저장소를 만들면 여기에 나타납니다.');
    return;
  }
  const ordered = [...repositories].sort((first, second) => {
    const firstRank = featuredProjectNames.indexOf(first.name);
    const secondRank = featuredProjectNames.indexOf(second.name);
    return (firstRank < 0 ? 99 : firstRank) - (secondRank < 0 ? 99 : secondRank);
  });
  projectList.innerHTML = ordered.map(({ name, description, language, stargazers_count: stars }) => {
    const url = `${profileUrl}/${encodeURIComponent(name)}`;
    const story = projectStories[name];
    const apiDescription = typeof description === 'string' ? description.trim() : '';
    const summary = apiDescription
      ? `<p>${escapeHtml(apiDescription)}</p>`
      : story
        ? `<p>${story.map(([label, sentence]) => `<strong>${escapeHtml(label)}</strong> ${escapeHtml(sentence)}`).join('<br><br>')}</p>`
        : '<p>저장소 소개가 준비 중입니다.</p>';
    return `
      <article class="project-card">
        <div class="project-card-top"><span>PUBLIC REPOSITORY</span><span aria-hidden="true">↗</span></div>
        <h3><a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)} ↗</a></h3>
        ${summary}
        <div class="project-meta"><span>● ${escapeHtml(language || '언어 정보 없음')}</span><span>★ ${Number.isFinite(stars) ? stars : 0}</span></div>
      </article>`;
  }).join('');
};

let isLoading = false;
let lastRequestAt = 0;
async function loadProjects() {
  if (isLoading) return;
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
    renderState(`프로젝트를 불러올 수 없습니다. ${error.message}`, true);
  } finally {
    isLoading = false;
  }
}
loadProjects();

/* 6. 문의 폼: 입력값 검증만 하며 실제 메시지는 전송하지 않습니다. */
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
formFields.forEach((field) => {
  field.addEventListener('input', () => {
    validateField(field);
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  });
});
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
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
  formStatus.textContent = '입력 검증이 완료되었습니다. 이 양식은 학습용이므로 실제 메시지는 전송되지 않습니다.';
  formStatus.className = 'form-status success';
});