# 🏋️‍♀️인공지능 및 빅데이터 기반 홈트레이닝 구독 서비스

A brief description of what this project does and who it's for.

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

해당 프로젝트는 ~~를 하기 위한 프로젝트입니다. 배경 목적 필요성 기대효과

### (1) 개발 배경 및 목적

본 프로젝트는 **제주 관광 물가가 많이 올랐기 때문에 여행비용을 줄이기** 위한 서비스입니다.

<details>
<summary>📆 개발 기간(2025-11-12 ~ 2025-12-24 - [작업일 31일])</summary>

- 개발 기간은 2025년 11월 12일부터 12월 24일까지 진행
- [작업일정표(WBS)](docs/산출물/01_WBS.xlsx)
</details>

## 2. 목표(Features)

- 정형화: tensorflow와 pytorch 문법에 대한 정형화
- 체계화: 체계적인 문서화 적용(docs 폴더 참고)
- 다양한 예제: 다양한 task에 대한 예제 제공(Classification, Segmentation, Object Detection, etc.)

<details>
<summary>⚙️ 서비스 핵심 기능</summary>

- 대화형 구현: 제주시(서귀포) 동을 입력하면 주변 착한 가게를 모두 제공
- aaa

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

## Acknowledgments

프로젝트 기간동안 수고 많으셨습니다 ^^
