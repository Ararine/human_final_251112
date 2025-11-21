from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.user import User

def create_user(db: Session, data: dict):
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    gender = data.get("gender")
    age = data.get("age")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    # 이메일 중복 확인
    exists = db.query(User).filter(User.email == email).first()
    if exists:
        raise HTTPException(status_code=409, detail="Email already registered")

    new_user = User(
        email=email,
        password=password,
        name=name,
        gender=gender,
        age=int(age) if age else None
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
