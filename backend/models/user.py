from sqlalchemy import Column, Integer, String
from db.database import Base

class user(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    type = Column(String(20), default="normal")
    points = Column(Integer, default=0)
