from fastapi import status, Body, Path, Depends
from fastapi.responses import JSONResponse
import pandas as pd
from services import user_detail
from utils import verify_token

# 유저 기본 정보 생성
# , user=Depends(verify_token)

async def create_user_detail_info(
    user=Depends(verify_token),
    body: dict = Body(...),
    ):
    try:
        user_id=user["user_id"]
        goal=body.get("goal")
        job=body.get("job")
        activity_level=body.get("activity_level")
        activity_duration=body.get("activity_duration")
        sleep_duration=body.get("sleep_duration")
        chronotype=body.get("chronotype")
        disease=body.get("disease")
        equipment=body.get("equipment")
        food_restrictions=body.get("food_restrictions")
        water_intake=body.get("water_intake")
        
        disease = ",".join(disease)
        equipment = ",".join(equipment)
        
        activity_duration = int(activity_duration)
        sleep_duration = int(sleep_duration)
        activity_duration = f"{activity_duration//60:02d}:{activity_duration%60:02d}:00"
        sleep_duration = f"{sleep_duration:02d}:00:00"

        post = user_detail.create_user_detail_info(
            user_id=user_id,
            goal=goal,
            job=job,
            activity_level=activity_level,
            activity_duration=activity_duration,
            sleep_duration=sleep_duration,
            chronotype=chronotype,
            disease=disease,
            equipment=equipment,
            food_restrictions=food_restrictions,
            water_intake=water_intake
        )

        return JSONResponse(
            {
                "message":"유저 상세 정보 생성",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "유저 상세 정보 생성 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)

async def get_user_detail(
    user=Depends(verify_token)
    ):
    try:
        user_id=user["user_id"]
        post = user_detail.get_user_detail_info_by_id(
            user_id)

        return JSONResponse(
            {
                "message":"유저 상세 정보 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "유저 상세 정보 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)

async def update_user_detail_info_by_id(
    body: dict = Body(...),
    user=Depends(verify_token)
):
    try:
        user_id=user["user_id"]
        goal=body.get("goal")
        job=body.get("job")
        activity_level=body.get("activity_level")
        activity_duration=body.get("activity_duration")
        sleep_duration=body.get("sleep_duration")
        chronotype=body.get("chronotype")
        disease=body.get("disease")
        equipment=body.get("equipment")
        food_restrictions=body.get("food_restrictions")
        water_intake=body.get("water_intake")
        disease = ",".join(disease)
        equipment = ",".join(equipment)
        
        activity_duration = int(activity_duration)
        sleep_duration = int(sleep_duration)
        activity_duration = f"{activity_duration//60:02d}:{activity_duration%60:02d}:00"
        sleep_duration = f"{sleep_duration:02d}:00:00"

        updated = user_detail.update_user_detail_info_by_id(
            user_id=user_id,
            goal=goal,
            job=job,
            activity_level=activity_level,
            activity_duration=activity_duration,
            sleep_duration=sleep_duration,
            chronotype=chronotype,
            disease=disease,
            equipment=equipment,
            food_restrictions=food_restrictions,
            water_intake=water_intake,
        )
        if not updated:
            return JSONResponse(
                {"message": "유저 상세 정보 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "유저 상세 정보 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "유저 상세 정보 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

