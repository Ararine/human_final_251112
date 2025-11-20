from sqlalchemy.orm import Session
from models.user import user
from utils import hash_password
# SQL문 안쓰고 아래처럼 작성된 걸 ORM이라 합니다.
# ORM 쓰지말아주셔요 ORM 은 JOIN 작업이 불가한 경우가 발생합니다.
def create_user(db: Session, email: str, password: str):
    hashed_pw = hash_password(password)
    db_user = user(email=email, password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(user).filter(user.email == email).first()
