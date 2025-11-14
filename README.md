# 🏋️‍♀️인공지능 및 빅데이터 기반 홈트레이닝 구독 서비스

해당 서비스는 **부상 방지** 및 **자세 교정**과 **다이어트**를 종합적으로 지원하는 헬스케어 서비스입니다.

---

<div style="display: flex; align-items: center; gap: 8px;">
  <div>
    <div>
        <img src="https://img.shields.io/badge/Licence-GPL-1177AA.svg?style=flat-round" />
        <img src="https://img.shields.io/badge/Version-0.0.1-1177AA.svg?style=flat-round" />
        <img src="https://img.shields.io/badge/github-%23121011?logo=github&logoColor=white" alt="GitHub" />
        <img src="https://img.shields.io/badge/Docker-1572B6?logo=docker&logoColor=fff" />
        <img src="https://img.shields.io/badge/Docker--Compose-000000?logo=docker&logoColor=white" />
        <img src="https://img.shields.io/badge/MySQL-1572B6?logo=mysql&logoColor=fff" />
    </div>
    <div>
        <img
            src="https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white" alt="HTML" />
        <img
        src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=CSS&logoColor=white" alt="CSS Badge" />
        <img
        src="https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?logo=javascript&logoColor=black" alt="JavaScript" />
        <img src="https://img.shields.io/badge/react-1177AA?logo=react&logoColor=%2361DAFB" alt="React" />
        <img src="https://img.shields.io/badge/TensorFlow.js-FFFFFF.svg?style=flat-round&logo=TensorFlow" />
    </div>
    <div>
        <img src="https://img.shields.io/badge/python-3.10.18-1177AA.svg?style=flat-round" alt="Python" />
        <img src="https://img.shields.io/badge/FastAPI-02569B?logo=FastAPI&logoColor=white" alt="FastAPI" />
        <img src="https://img.shields.io/badge/Tensorflow-FFFFFF.svg?style=flat-round&logo=Tensorflow" />
        <img src="https://img.shields.io/badge/PyTorch-FFFFFF.svg?style=flat-round&logo=PyTorch" />
        <img src="https://img.shields.io/badge/ONNX-000000.svg?style=flat-round&logo=ONNX" />
    </div>
  </div>
</div>

## 1. 소개(Introduction)

### (1) 개발 배경

- 현대 사회에서는 장시간의 좌식 생활, 스마트 기기 사용 증가, 불규칙한 생활 습관 등으로 인해 **자세 불균형**과 **근골격계 질환**이 빈번하게 발생
- 운동 부족과 잘못된 식습관으로 인해 **비만 및 체력 저하** 문제가 심화
- 단순한 체중 감량이 아닌 **올바른 자세와 건강한 생활 습관 형성**에 대한 관심이 증대

### (2) 목적

- 사용자 개인의 자세 분석과 운동 패턴 데이터를 기반으로 부상 예방, 운동 자세 교정, 효율적인 다이어트 지원을 목표로 함
- 사용자 스스로 건강한 신체 밸런스를 유지할 수 있는 스마트 헬스케어 환경을 제공

<details>
<summary>개발 필요성 및 기대효과</summary>

### (3) 필요성

- 단순한 피트니스 앱은 운동량이나 칼로리만 제공하지만, 자세나 부상 위험까지 관리하는 서비스는 부족
- 운동 중 잘못된 자세는 부상으로 이어질 가능성이 높고, 이는 운동 지속성을 감소
- 개인의 신체 데이터를 기반으로 한 맞춤형 피드백 시스템을 통해, 사용자는 보다 안전하고 지속 가능한 운동 루틴을 구축 가능

### (4) 기대효과

- 부상예방: 실시간 자세 분석을 통해 잘못된 자세를 즉시 교정하여 부상 위험 최소화
- 운동 효율 향상: 개인별 피드백을 통해 운동 효과 극대화
- 건강 관리 습관 형성: 꾸준한 데이터 기반 피드백으로 지속 가능한 건강 관리 실현
- 헬스 케어 시장 확장: AI 기반 자세 분석 및 건강 관리 솔루션으로 상업적·기술적 발전 가능성 확보
</details>

<details>
<summary> 개발 기간(2025-11-12 ~ 2025-12-24 - [작업일 31일])📆</summary>

- [작업일정표(WBS)](docs/산출물/01_WBS.xlsx)
- [회의록](docs/산출물/01_회의록)
</details>

## 2. 목표(Features)

- 통합성: 기존 서비스들이 지니는 기능을 결합하여 제시
- 편의성: 사용자 입장에서 사용하기 편리하게 구현
- 독창성: 기존 서비스에 없던 부상방지 기능 제시

<details>
<summary>⚙️ 서비스 핵심 기능</summary>

- 정보제공기능
- 자세교정기능

</details>

---

## 3. 설치 및 실행(Installation)

<details>
    <summary >초기 환경 구축(최초 1회)</summary>

1. 저장소 복제

```bash
# 원격저장소에서 final 이라는 폴더명으로 복제
git clone https://github.com/qkdrk7777775/human_final_251112.git final
```

2. 저장소 이동

```bash
# 가져온 final 폴더로 이동
cd final
```

3. 프론트앤드 환경 구축

```bash
# final/frontend로 이동
cd frontend
# 패키지 설치
npm install --lagacy-peer-deps
```

4. 백앤드 환경 구축

```bash
# Conda 환경 생성(final 경로에서 실행)
conda env create -f environment/conda/backend.yml

# 환경 활성화
conda activate final_backend

# 환경 삭제
conda env remove -n final_backend

```

5. AI 환경 구축

```bash
# final/backend로 이동
cd backend
# Conda 환경 생성(final 경로에서 실행)
conda env create -f environment/conda/ai.yml

# 환경 활성화
conda activate final_ai

# 환경 삭제
conda env remove -n final_ai
```

</details>

### (1) 환경 실행

1. 프론트앤드 서버 실행

   ```bash
   # final/frontend 경로로 이동
   cd frontend
   npm run start
   ```

2. 백앤드 서버 실행

   ```bash
   # Conda 환경 활성화
   conda activate final_backend
   # final 경로에서 실행
   python backend/main.py
   ```

3. 데이터베이스 서버 실행

   ```bash
   # docker-desktop 실행 후 DB 실행
   docker-compose up -f docker-compose-db.yml -d
   ```

---

## 4. 개발 가이드

<details>
    <summary>
        깃허브 관련
    </summary>

1. [Git 작성 방법](docs/guide/GIT.md)
2. [Git 사용 방법](docs/using/GIT.md)
</details>
<details>
    <summary>
        코딩 관련
    </summary>

3. [코딩 가이드라인](docs/guide/CODE_DOCS.md)
</details>

<details>
    <summary>
        프로젝트 내 단어/용어 정의
    </summary>

1. [표준단어](docs/guide/STANDARD_WORD.md)
2. [표준용어](docs/guide/STANDARD_TERM.md)
</details>

<details>
    <summary>
        프로젝트 산출물
    </summary>

1. [회의록](docs/산출물/01_회의록)
2. [요구사항정의/명세](docs/산출물/02_요구사항명세서)
3. [데이터베이스 설계](docs/산출물/03_데이터베이스_설계)

</details>

## 5. 향후 개발 계획 🚧

## 6. 라이센스(License) ©️

본 프로젝트의 코드는 비상업적 용도로 자유롭게 사용하실 수 있습니다.
상업적 이용이나 수정, 재배포 시에는 사전 연락을 부탁드립니다.

문의는 이메일(qkdrk7777775@gmail.com)로 해주시기 바랍니다.

코드 사용시에도 연락 주시고 사용해주시면 감사하겠습니다.

---

## 7. 기여자(Collaborator) 👨‍💻👩‍💻

- **조창제** - qkdrk7777775@gmail.com
- **박성현** -
- **박한비** -
- **신진우** -
- **이선혁** -
- **이향래** -

---

## 8. 참고문헌(Reference)

- [국내](https://www.myfitnesspal.com/ko)
- [해외 - 운동 및 커뮤니티](https://www.freeletics.com/en/)
- [해외 - 식단 및 관리](https://fitbod.me/)
- [해외 - 운동](https://sworkit.com/)
- [국민체력100 인증단계](https://nfa.kspo.or.kr/intro/step.kspo)
- [국민체력100 동영상 정보 API](https://www.data.go.kr/data/15108846/openapi.do)

## Acknowledgments

프로젝트 기간동안 수고 많으셨습니다 ^^
