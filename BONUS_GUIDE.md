# B1-1 보너스 적용 및 확인

공식 보너스 4종:
1. GitHub 공개 저장소 언어별 필터: `#project-filters`, `Array.filter()`
2. Hero 타이핑 효과: `#hero-typing`, 모션 최소화 지원
3. Formspree 실제 메일 전송 연동: `index.html`의 `data-form-endpoint=""`에 `https://formspree.io/f/발급ID` 설정 → 확인용 테스트 메시지 전송 → 서비스 화면에서 접수 확인. endpoint를 비워두면 기존 학습용 검증 동작만 수행합니다. 현재 실제 전송은 검증 대기입니다.
4. 시스템 다크 모드 감지: `prefers-color-scheme`, 사용자가 선택하면 localStorage 우선

작업 브랜치: `feature/official-bonuses`. 기존 `main` PASS 버전 보존. 실제 브라우저 동작 및 메일 접수 확인 후 병합하세요.
