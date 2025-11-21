# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config import config

DB = config["DB"]

DB_URL = f"mysql+pymysql://{DB['USER_ID']}:{DB['PASSWORD']}@{DB['HOST']}:{DB['PORT']}/{DB['DATABASE']}?charset=utf8mb4"

engine = create_engine(DB_URL, echo=True, future=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
