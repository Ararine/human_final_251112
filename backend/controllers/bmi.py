from fastapi import status, Body, Path
from fastapi.responses import JSONResponse
from services import bmi

#create
async def create_bmi_by_id(
    bmi_id: int = Path(...), 
    body: dict = Body(...)
):
    try:
        body.get("weight")
        weight = body.get("weight")
        height = body.get("height")
        print(weight,height)
        updated = bmi.update_bmi_by_id(bmi_id, weight, height)

        if not updated:
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

# read
async def read_bmi_by_id(
    bmi_id: int = Path(...), 
    body: dict = Body(...)
):
    try:
        body.get("weight")
        weight = body.get("weight")
        height = body.get("height")
        print(weight,height)
        read = bmi.read_bmi_by_id(bmi_id, weight, height)

        if not read:
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
async def update_bmi_by_id(
    bmi_id: int = Path(...), 
    body: dict = Body(...)
):
    try:
        weight = body.get("weight")
        height = body.get("height")
        print(weight,height)
        updated = bmi.update_bmi_by_id(bmi_id, weight, height)

        if not updated:
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
async def delete_bmi_by_id(bmi_id: int = Path(...)):
    try:
        deleted = bmi.delete_bmi_by_id(bmi_id)
        if not deleted:
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
        
