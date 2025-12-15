
from models import post,reported_post

# 게시글 생성
def create_post(title: str, contents: str, user_id: int):
    post_id = post.insert_post(title, contents, user_id)
    return post_id

# 게시글 전체 조회
def get_posts():
    posts = post.fetch_all_posts()
    return posts

# 게시글 전체 조회
def get_posts_by_user_id(user_id:int):
    posts = post.fetch_all_posts_by_user_id(user_id)
    return posts

# 게시글 상세 조회
def get_post(post_id: int):
    post_data = post.fetch_post_by_id(post_id)
    return post_data

# 게시글 수정
def update_post(post_id: int, title: str, contents: str,user_id:int):
    updated = post.update_post_by_id(post_id, title, contents, user_id)
    return updated

# 게시글 삭제
def delete_post(post_id: int, user_id:int):
    deleted = post.delete_post_by_id(post_id, user_id)
    return deleted

# 게시글 삭제 - 관리자 
def admin_delete_post(post_id: int):
    is_exists = reported_post.get_reported_posts_by_post_id(post_id)
    if is_exists:
        reported_post.delete_post_report_by_post_id(post_id)
    deleted = post.delete_post_by_id(post_id)
    return deleted


# 게시글 신고
def create_reported_post(post_id: str, user_id: str, comments: int):
    is_exists = reported_post.get_reported_posts_by_id(post_id, user_id)
    print(is_exists)
    if is_exists:
        return None
    post_id = reported_post.insert_reported_post(post_id, user_id, comments)
    return post_id

# 신고 게시글 조회
def get_reported_posts():
    post_data = reported_post.get_reported_posts()
    return post_data
# 신고 게시글 삭제
def delete_reported_post(post_id: int, user_id:int):
    deleted = reported_post.delete_post_report_by_id(post_id, user_id)
    return deleted
# 유저별 게시글 조회
def get_posts_by_user_id(user_id: int):
    posts = post.fetch_posts_by_user_id(user_id)
    return posts
