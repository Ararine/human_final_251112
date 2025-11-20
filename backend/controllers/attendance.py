from fastapi import status, Body, Path
from fastapi.responses import JSONResponse

from services import attendance

# 개별 출석
async def attendance_by_user_id(user_id: str = Path(...)):
    try:
        check, response = attendance.attendance_by_user_id(user_id)
        if check:
            return JSONResponse(
                {"message": "이미 출석하였습니다.",
                 "data":response}, 
                status_code=status.HTTP_409_CONFLICT)
        return JSONResponse(
            {"message": "출석 완료", 
             "data": response}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "출석 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        