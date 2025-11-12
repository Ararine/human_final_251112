# Git 사용법

## 1. 초기 세팅

```bash
# 1️⃣ 사용자 정보 설정
git config --global user.name "내이름"
git config --global user.email "내이메일@example.com"

# 2️⃣ 현재 설정 확인(q 버튼으로 종료)
git config --list
```

## 2. Git 활용

### (1). 단일 브랜치 기반 작업 방식(활용)

- 깃허브에서 현재 컴퓨터로 코드 가져올 때(최초 1회 수행)

```bash
# 원격 저장소에서 현재 컴퓨터에 1회 설치(최초 1회 수행)
git clone https://github.com/qkdrk7777775/human_final_251112.git final
```

- 현재 컴퓨터에서 코드 작업 후 최신화 할 때

```bash
# 원격 저장소의 최신코드를 현재 컴퓨터로 가져오는 코드
git pull

# 변경된 파일을 현재컴퓨터 저장소에 추가
git add . # . 은 현재경로의 파일/폴더 그리고 하위 경로의 파일/폴더 모두를 의미
# or
git add <특정파일 혹은 폴더>

# 변경된 파일의 변경 내용 기재
git commit -m "메시지명"

# 변경된 내용을 원격 저장소에 전송
git push
```

[참고 - git commit 메세지 작성법](docs/guide/git.md)

<details>
<summary> 참고- 다중 브랜치 기반 작업 방식 </summary>

### (2). 다중 브랜치 기반 작업 방식

```bash
# 현재 브랜치 확인
git branch

# 현재 브랜치 삭제
git branch -d 삭제할브랜치명
```

- 브랜치 변경

```bash
git switch 브랜치명
# 혹은
git checkout 브랜치명
```

- 원격 저장소 내용 가져오기

```bash
# 특정 브랜치 내용 원격 저장소에서 가져오기
git pull origin 브랜치명
```

- 브랜치 병합

```bash
# 브랜치1 최신화(원격저장소 버전으로 최신화)
git switch 브랜치1
git pull origin 브랜치1

# 브랜치2 최신화(원격저장소 버전으로 최신화)
git switch 브랜치2
git pull origin 브랜치2

# 브랜치2의 내용을 브랜치1에 반영
git switch 브랜치1 # 브랜치1 활성화 상태
git merge 브랜치2  # 브랜치2를 병합
```

<details>
<summary>예시</summary>

- dev 환경의 내용을 cjcho에 가져오기

```bash
# 최신화
git switch dev
git pull origin dev

# 최신화
git switch cjcho
git pull origin cjcho

git switch cjcho # cjcho 활성화 상태
git branch # *cjcho 확인
git merge dev  # dev 환경의 내용을 cjcho에 병합
```

</details>

- 작업 후 코드 반영

```bash
# 활성화 된 브랜치 확인
git branch

# 원격 저장소의 최신 내용 가져오기
git pull

# 현재 컴퓨터에서 변경된 파일을 현재컴퓨터 저장소에 추가
git add .
# or
git add <특정파일 혹은 폴더>

# 변경된 파일의 변경 내용 기재
git commit -m "메시지명"

# 변경된 내용을 원격 저장소에 전송
git push origin 브랜치명
```

- GitHub에서 Pull Request 생성

```bash
# 깃허브 사이트에서 아래와 같이 작성
- PR 대상: dev
- 리뷰어: 조장
- 제목 예시: [feat] 얼굴 복원 기능 추가
- 내용: 변경 요약, 실행 방법, 테스트 포인트
```

```bash
# 반영 방법
조장이 dev에서 코드 테스트 후 main으로 병합
개인 브랜치는 필요 시 dev 기준으로 다시 최신화
```

</details>
