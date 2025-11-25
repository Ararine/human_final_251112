import { useState, useEffect } from "react";

import Uploader from "../../components/Uploader";
const Exercise = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    // 선택된 이미지 파일만 필터링
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    // 미리보기 URL 생성
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    // 언마운트 시 URL 해제
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }
    // const result = await uploadFiles(files);
    // console.log(result);
    console.log("업로드할 파일들:", files);
  };
  return (
    <>
      <div style={{ margin: "40px" }}>
        <Uploader
          files={files}
          setFiles={setFiles}
          handleUpload={handleUpload}
        />
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Exercise;
