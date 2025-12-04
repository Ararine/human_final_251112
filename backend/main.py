import sys, uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import config
from routes import (
    community, user, test, comment, reaction,
    attendance, qna, ai, file, exercise, meal,
    user_base, 
    bmi
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(community.router, prefix="/posts")
app.include_router(comment.router, prefix="/comments")
app.include_router(reaction.router, prefix="/reactions")
app.include_router(attendance.router, prefix="/attendance")
app.include_router(qna.router, prefix="/qna")
app.include_router(user.router, prefix="/user")
app.include_router(ai.router, prefix="/ai")
app.include_router(file.router, prefix="/file")
app.include_router(exercise.router, prefix="/exercise")
app.include_router(meal.router, prefix="/meal")
app.include_router(user_base.router, prefix="/base")
app.include_router(bmi.router, prefix="/bmi")

if __name__ == "__main__":
    try:
        uvicorn.run(
            "main:app", 
            host="0.0.0.0",
            port=config["BACKEND_PORT"],
            reload=True)
    except Exception as e:
        sys.exit(1)

if __name__ == "__main__":
    try:
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=config["BACKEND_PORT"],
            reload=True
        )
    except Exception as e:
        sys.exit(1)