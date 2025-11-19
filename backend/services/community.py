
from models import community

# 게시글 생성
def create_post(title: str, contents: str, user_id: int):
    post_id = community.insert_post(title, contents, user_id)
    return post_id

# 게시글 전체 조회
def get_posts():
    posts = community.fetch_all_posts()
    print(posts)
    return posts

# 게시글 상세 조회
def get_post(post_id: int):
    post = community.fetch_post_by_id(post_id)
    return post

# 게시글 수정
def update_post(post_id: int, title: str, contents: str):
    print(post_id,title, contents)
    updated = community.update_post_by_id(post_id, title, contents)
    return updated

# 게시글 삭제
def delete_post(post_id: int):
    deleted = community.delete_post_by_id(post_id)
    return deleted