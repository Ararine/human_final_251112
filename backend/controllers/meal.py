import io
from PIL import Image
from fastapi import status, UploadFile, File, Body, Path, Depends
from fastapi.responses import JSONResponse

from services import meal
from utils import verify_token

async def create_recommended_meal(
    body: dict = Body(...), user=Depends(verify_token)):
    try:
        user_id=user["user_id"]
        n_days=body.get("n_days")
        n_times=body.get("n_times")
        results = meal.create_meal_list(user_id, n_days, n_times)
        return JSONResponse(
            {"message": "기본 식단 생성 완료", 
             "results": results}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 식단 생성 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)


async def get_recommended_meal(
     user=Depends(verify_token)):
    try:
        user_id=user["user_id"]
        
        results = meal.get_curriculum_by_id(user_id)
        return JSONResponse(
            {"message": "기본 식단 생성 완료", 
             "results": results}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 식단 생성 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)


async def remove_recommended_meal(
    user=Depends(verify_token)):
    try:
        user_id=user["user_id"]
        
        results = meal.delete_curriculum_by_id(user_id)
        return JSONResponse(
            {"message": "기본 식단 생성 완료", 
             "results": results}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 식단 생성 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)

# 칼로리 모델 가중치 필요
async def get_calories(file: UploadFile = File(...)):
    try:
        content = await file.read()
        pil_img = Image.open(io.BytesIO(content)).convert("RGB")

        # import os,shutil,cv2
        # import numpy as np 
        # np_array = np.frombuffer(content, np.uint8)
        # img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
        det_res, response = meal.get_calories(pil_img)
        
        return JSONResponse(
            {"message": "칼로리 추정 완료", 
             "location":det_res,
             "data": response}, status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "칼로리 추정 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)

async def create_base_meal(
    body: dict = Body(...)):
    try:
        meal_name=body.get("name")
        calories=body.get("calories")
        link=body.get("link")
        data = meal.create_base_meal(
            meal_name, calories, link
        )
        return JSONResponse(
            {"message": "기본 식단 생성 완료", 
             "data": data}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 식단 생성 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        

async def get_base_meal():
    try:
        data = meal.get_base_meals()
        return JSONResponse(
            {
                "message":"기본 식단 조회 성공",
                "data": data
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 식단 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)


async def get_base_meal_by_id(meal_id: int = Path(...)):
    try:
        post = meal.get_base_meal_by_id(meal_id)
        return JSONResponse(
            {
                "message":"기본 식단 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 식단 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)


async def update_base_meal_by_id(
    meal_id: int = Path(...), 
    body: dict = Body(...)
):
    try:
        name = body.get("name")
        calories = body.get("calories")
        link = body.get("link")
        updated = meal.update_base_meal_by_id(meal_id, name,calories, link)

        if not updated:
            return JSONResponse(
                {"message": "기본 식단 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "기본 식단 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "기본 식단 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )


async def delete_base_meal_by_id(meal_id: int = Path(...)):
    try:
        deleted = meal.delete_base_meal_by_id(meal_id)
        if not deleted:
            return JSONResponse(
                {"message": "기본 식단 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "기본 식단 삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "기본 식단 삭제 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST)
        