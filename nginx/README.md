nginx는 인터넷에서 파일을 공유할 수 있게 해주는 기능을 가진 도구에 해당

백엔드에 파일을 업로드하고 그 업로드 된 파일을 프론트에 보여주기 위해서는 nginx 같은 도구들이 필요

# 설치

[링크](https://nginx.org/en/download.html)

nginx/Windows-X.XX.X 버전 다운로드

nginx폴더에 압축풀기

아래와 같이 설정할 것

```bash
# conf/nginx.conf 가 수정해야될 파일
nginx/
├── conf/
├── contrib
├── docs
├── html
├── logs
├── temp
└── nginx.exe
```

# 실행

```bash
cd final/nginx # nginx폴더로 이동
# final/nginx/temp 폴더 생성 후 아래 명령어 실행
nginx.exe # nginx 실행
nginx -s quit # 종료
taskkill /F /IM nginx.exe # 종료 제대로 안될 시
```
