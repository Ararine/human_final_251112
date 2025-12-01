from fastapi import status, Body, Path, Depends
from fastapi.responses import JSONResponse

from services import exercise
from utils import verify_token

async def create_curriculum(
    body: dict = Body(...), user=Depends(verify_token)):
    try:
        user_id=user["user_id"]
        n_days=body.get("n_days")
        available_time = body.get("available_time")
        
        results = exercise.create_curriculum(user_id, n_days, available_time)
        return JSONResponse(
            {"message": "기본 커리큘럼 생성 완료", 
             "results": results}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 커리큘럼 생성 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)

# 기본 운동 생성
# , user=Depends(verify_token)
async def create_exercise(body: dict = Body(...)):
    try:
        ex_name=body.get("name")
        ex_type=body.get("type")
        ex_link=body.get("link")
        
        post_id = exercise.create_exercise(
            ex_name, ex_type, ex_link
        )
        return JSONResponse(
            {"message": "기본 운동 생성 완료", 
             "post_id": post_id}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 운동 생성 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        

# 기본운동 상세 조회
async def get_exercies():
    try:
        post = exercise.get_exercies()
        return JSONResponse(
            {
                "message":"기본 운동 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 운동 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)


async def get_exercies_by_ex_id(ex_id: int = Path(...)):
    try:
        post = exercise.get_exercies_by_ex_id(ex_id)
        return JSONResponse(
            {
                "message":"기본 운동 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 운동 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)

# 기본운동 수정
async def update_exercise_by_ex_id(
    ex_id: int = Path(...), 
    body: dict = Body(...)
):
    try:
        ex_name = body.get("name")
        ex_type = body.get("type")
        ex_link = body.get("link")
        updated = exercise.update_exercise_by_ex_id(
            ex_id, ex_name, ex_type, ex_link)

        if not updated:
            return JSONResponse(
                {"message": "기본 운동 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "기본 운동 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "기본 운동 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

async def delete_exercise_by_ex_id(ex_id: int = Path(...)):
    try:
        deleted = exercise.delete_exercise_by_ex_id(ex_id)
        if not deleted:
            return JSONResponse(
                {"message": "기본 운동 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "기본 운동 삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 운동 삭제 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST)
        