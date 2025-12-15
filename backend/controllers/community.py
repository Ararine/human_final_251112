from fastapi import status, Body, Path, Query, Depends
from fastapi.responses import JSONResponse

from services import community
from utils import verify_token

# 게시글 조회
async def create_post(body: dict = Body(...), user=Depends(verify_token)):
    try:
        post_id = community.create_post(
            title=body.get("title"),
            contents=body.get("contents"),
            user_id=user["user_id"]
        )
        return JSONResponse({"message": "게시글 생성 완료", "post_id": post_id}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse({"message": "게시글 생성 실패", "error":str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

# 게시글 모두 조회
async def read_posts():
    try:
        posts = community.get_posts()
        return JSONResponse(
            {
                "message":"게시글 조회 성공",
                "data": posts
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 조회 실패", "error":str(e)}, 
            status_code=status.HTTP_404_NOT_FOUND
            )

async def read_posts_by_user_id(user_id: int = Path(...)):
    try:
        posts = community.get_posts_by_user_id(user_id)
        return JSONResponse(
            {
                "message":"게시글 조회 성공",
                "data": posts
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 조회 실패", "error":str(e)}, 
            status_code=status.HTTP_404_NOT_FOUND
            )
        
# 게시글 상세 조회
async def read_post(post_id: int = Path(...)):
    try:
        post = community.get_post(post_id)
        if not post:
            return JSONResponse(
                {"message": "게시글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {
                "message":"게시글 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)

# 게시글 수정
async def update_post(
    post_id: int = Path(...), 
    body: dict = Body(...), user=Depends(verify_token)
):
    try:
        # TODO 관리자 혹은 해당 작성자만 조회 가능하게 수정
        title = body.get("title")
        contents = body.get("contents")
        user_id=user["user_id"]
        updated = community.update_post(post_id, title, contents, user_id)

        if not updated:
            return JSONResponse(
                {"message": "게시글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "게시글 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

# 게시글 삭제
async def delete_post(post_id: int = Path(...), user=Depends(verify_token)):
    try:
        # TODO 관리자 혹은 해당 작성자만 삭제 가능하게 수정
        user_id = user["user_id"]
        deleted = community.delete_post(post_id, user_id)
        if not deleted:
            return JSONResponse(
                {"message": "게시글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "게시글 삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 삭제 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST)
        

async def admin_delete_post(post_id: int = Path(...)):
    try:
        # TODO 관리자 혹은 해당 작성자만 삭제 가능하게 수정
        deleted = community.admin_delete_post(post_id)
        if not deleted:
            return JSONResponse(
                {"message": "게시글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "게시글 삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 삭제 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST)


# 게시글 신고
async def create_reported_post(
    post_id: int = Path(...), 
    body: dict = Body(...)):
    try:
        response = community.create_reported_post(
            post_id,
            user_id=body.get("comment_user_id"),
            comments=body.get("comment")
        )
        if response is None:
            # 이미 신고한 경우
            return JSONResponse(
                {"message": "이미 신고한 게시글입니다."},
                status_code=status.HTTP_409_CONFLICT
            )
        return JSONResponse({"message": "게시글 신고 완료", "post_id": response}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse({"message": "게시글 신고 실패", "error":str(e)}, status_code=status.HTTP_400_BAD_REQUEST)


# 신고 게시글 모두 조회
async def read_reported_posts():
    # TODO 관리자만 조회 가능하게 수정
    try:
        posts = community.get_reported_posts()
        return JSONResponse(
            {
                "message":"게시글 조회 성공",
                "data": posts
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 조회 실패", "error":str(e)}, 
            status_code=status.HTTP_404_NOT_FOUND
            )
        

# 게시글 복구
async def delete_reported_post(
    post_id: int = Path(...),
    body: dict = Body(...)):
    user_id=body.get("user_id")
    print(user_id)
    try:
        response = community.delete_reported_post(
            post_id,
            user_id # 게시자
        )
        return JSONResponse({"message": "게시글 복구 완료", "post_id": response}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse({"message": "게시글 복구 실패", "error":str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

# 유저별 게시글 조회
async def read_user_posts(user_id: int = Path(...)):
    try:
        posts = community.get_posts_by_user_id(user_id)
        return JSONResponse(
            {
                "message": "유저 게시글 조회 성공",
                "data": posts
            },
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "유저 게시글 조회 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )