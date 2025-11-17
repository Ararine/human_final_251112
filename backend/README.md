# FastAPI Backend

FastAPI 기반 RESTful API 서버 프로젝트입니다.
커뮤니티, 유저, 운동, 댓글, 좋아요 등 기능을 Layered 구조로 설계하였으며, Service/Model/Controller 계층으로 분리했습니다.  
Body, Query, Path 파라미터만 활용하도록 설계되었습니다.

---

## (1) 주요 기능

- 유저 인증 (회원가입, 로그인, JWT 인증)
- 커뮤니티 CRUD (게시글 생성, 조회, 수정, 삭제)
- 댓글 CRUD
- 좋아요 추가/삭제
- 운동 조회
- CORS 설정 지원

---

## (2) 프로젝트 구조

```bash
backend/
├── main.py
├── config.py
├── db/
│ ├── pool.py
├── controllers/
│ ├── community.py
│ ├── comment.py
│ ├── like.py
│ └── ....py
├── models/
│ ├── community.py
│ ├── comment.py
│ ├── like.py
│ └── ....py
├── services/
│ ├── community.py
│ ├── comment.py
│ ├── like.py
│ └── ....py
└── routers/
├── community.py
├── comment.py
├── like.py
└── ....py
```

## (3) 환경 구축

```bash
# Conda 환경 생성(final 경로에서 실행)
conda env create -f environment/conda/backend.yml

# 환경 활성화
conda activate final_backend

# 환경 삭제
conda env remove -n final_backend

```

## (4) 서버 실행

```bash
# Conda 환경 활성화
conda activate final_backend
# final 경로에서 실행
python backend/main.py
```

## (5) VScode 실행

<video width="480" controls>
  <source src="docs/guide/python가상환경선택.mp4" type="video/mp4">
  브라우저가 video 태그를 지원하지 않습니다.
</video>

```bash
# Conda 환경 활성화
conda activate final_backend

# final 경로에서 실행
python backend/main.py
```
