from fastapi import status, Body, Path
from fastapi.responses import JSONResponse
from services import bmi

#create
async def controllers_create_body_history(   
    body: dict = Body(...)
):
    try:
        weight = body.get("weight")
        height = body.get("height")
        print(weight,height)
        # 호출하는 함수는 서비스에 존재하는 함수명으로 수정 필요
        create = bmi.controllers_create_body_history(weight, height)

        if not controllers_update_body_history:
            return JSONResponse(
                {"message": "정보 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "생성 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "생성 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

# get
async def controllers_get_body_history(
    recode_id: int = Path(...), 
    
):
    try:
        # weight = body.get("weight")
        # height = body.get("height")
        # print(weight,height)
        # 호출하는 함수는 서비스에 존재하는 함수명으로 수정 필요
        # 키 몸무게 삭제 필요
        get = bmi.controllers_get_body_history(recode_id, weight, height)

        if not get:
            return JSONResponse(
                {"message": "정보 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "조회 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "조회 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

# update
async def controllers_update_body_history(
    recode_id: int = Path(...), 
    body: dict = Body(...)
):
    try:
        weight = body.get("weight")
        height = body.get("height")
        print(weight,height)
        # 호출하는 함수는 서비스에 존재하는 함수명으로 수정 필요
        update = bmi.controllers_update_body_history(recode_id, weight, height)

        if not update:
            return JSONResponse(
                {"message": "정보 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

# delete
async def controllers_delete_body_history(recode_id: int = Path(...)):
    try:
        # 호출하는 함수는 서비스에 존재하는 함수명으로 수정 필요
        delete = bmi.controllers_delete_body_history(recode_id)
        if not delete:
            return JSONResponse(
                {"message": "정보 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "삭제 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST)
        
