from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from config import config

user_id = config["DB"]["USER_ID"]
password = config["DB"]["PASSWORD"]
host = config["DB"]["HOST"]
port = config["DB"]["PORT"]
database = "final"

db_url = f"mysql+pymysql://{user_id}:{password}@{host}:{port}/{database}?charset=utf8mb4"

engine = create_engine(
    db_url,
    echo=True,
    pool_pre_ping=True
)

# 기존 execute_query
def execute_query(query: str, params: dict = None):
    try:
        with engine.connect() as conn:
            if params:
                result = conn.execute(text(query), params)
            else:
                result = conn.execute(text(query))
            return result
    except SQLAlchemyError as e:
        print(f"DB Error: {e}")
        raise e

# get_connection 함수 추가
def get_connection():
    """
    기존 코드 호환용, SQLAlchemy engine의 connect() 반환
    with get_connection() as conn:
        conn.execute(...)
    """
    return engine.connect()
