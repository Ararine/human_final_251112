import jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status,Response
from fastapi.security import OAuth2PasswordBearer

from config import config

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    # 한시간 후 폐기
    # expire = datetime.utcnow() + (expires_delta or timedelta(seconds=10))
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=60))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, config["JWT_SECRET"], algorithm="HS256")
    return encoded_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")  
def verify_token(response: Response, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, config["JWT_SECRET"], algorithms=["HS256"])
        exp = payload.get("exp")
        now = datetime.now(timezone.utc)

        time_left = exp - int(now.timestamp())

        # 남은 시간 10분 미만이면 자동 토큰 재발급
        if time_left < 600:  # 600초 = 10분
            new_exp = now + timedelta(hours=2)
            new_token = jwt.encode(
                {
                    "user_id": payload["user_id"],
                    "exp": int(new_exp.timestamp())
                },
                config["JWT_SECRET"],
                algorithm="HS256"
            )
            response.headers["X-New-Token"] = new_token  # 헤더로 전달

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="토큰이 만료되었습니다.",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="유효하지 않은 토큰입니다.",
        )