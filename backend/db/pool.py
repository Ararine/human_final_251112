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
