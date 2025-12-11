from fastapi import status, Body, Path
from fastapi.responses import JSONResponse
from services import bodyhistory


# ---------------------------
# CREATE - 몸 변화 이력 추가
# ---------------------------
async def create_body_history(body: dict = Body(...)):
    try:
        user_id = body.get("user_id")
        weight = body.get("weight")
        height = body.get("height")  # optional

        create = bodyhistory.service_create_body_history(
            user_id=user_id,
            weight=weight,
            height=height
        )

        if not create:
            return JSONResponse(
                {"message": "생성 실패"},
                status_code=status.HTTP_400_BAD_REQUEST
            )

        return JSONResponse(
            {"message": "생성 성공", "record_id": create},
            status_code=status.HTTP_200_OK
        )

    except Exception as e:
        return JSONResponse(
            {"message": "생성 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )



# ---------------------------
# GET - 특정 유저의 전체 이력 조회
# ---------------------------
async def get_body_history(user_id: int = Path(...)):
    try:
        result = bodyhistory.service_get_body_history(user_id)

        if not result:
            return JSONResponse(
                {"message": "조회 이력 없음"},
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "조회 성공", "data": result},
            status_code=status.HTTP_200_OK
        )

    except Exception as e:
        return JSONResponse(
            {"message": "조회 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )



# ---------------------------
# UPDATE - 특정 이력 수정
# ---------------------------
async def update_body_history(record_id: int = Path(...), body: dict = Body(...)):
    try:
        weight = body.get("weight")
        height = body.get("height")  # optional

        update = bodyhistory.service_update_body_history(
            record_id=record_id,
            weight=weight,
            height=height
        )

        if not update:
            return JSONResponse(
                {"message": "수정할 데이터 없음"},
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "수정 성공"},
            status_code=status.HTTP_200_OK
        )

    except Exception as e:
        return JSONResponse(
            {"message": "수정 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )



# ---------------------------
# DELETE - 특정 이력 삭제
# ---------------------------
async def delete_body_history(record_id: int = Path(...)):
    try:
        delete = bodyhistory.service_delete_body_history(record_id)

        if not delete:
            return JSONResponse(
                {"message": "삭제할 데이터 없음"},
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "삭제 완료"},
            status_code=status.HTTP_200_OK
        )

    except Exception as e:
        return JSONResponse(
            {"message": "삭제 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )
