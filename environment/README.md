<details>
    <summary>docker를 활용한 실행</summary>

```bash
# docker로 구동 시
docker-compose -f environ/docker-compose-backend.yml up -d
# 다시 build 해야하는 경우
docker-compose -f environ/docker-compose-backend.yml build
```

```bash
docker-compose -f environ/docker-compose-nginx.yml up -d
```

</details>
