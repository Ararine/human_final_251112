from sqlalchemy import create_engine
from config import config
user_id=config["DB"]["USER_ID"]
password=config["DB"]["PASSWORD"]
host=config["DB"]["HOST"]
port=config["DB"]["PORT"]
db_info = f"mysql+pymysql://{user_id}:{password}@{host}:{port}/final"
engine = create_engine(
    db_info,connect_args={}) 
