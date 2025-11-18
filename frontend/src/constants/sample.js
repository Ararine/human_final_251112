export const samplePosts = Array.from({ length: 45 }, (_, i) => {
  const day = ((i % 30) + 1).toString().padStart(2, "0"); // 01~30일
  const createdAt = `2025-11-${day}`;
  const updatedAt = `2025-11-${(((i + 2) % 30) + 1)
    .toString()
    .padStart(2, "0")}`; // 작성일 +1~2일로 임의 수정일
  const isPublic = i % 2 === 0; // 짝수 게시글 공개, 홀수 비공개

  return {
    id: i + 1,
    title: `게시글 제목 ${i + 1}`,
    content: `게시글 내용 ${i + 1}`,
    author: `작성자 ${i + 1}`,
    createdAt, // 작성일
    updatedAt, // 수정일
    isPublic, // 공개 여부 (true/false)
  };
});
