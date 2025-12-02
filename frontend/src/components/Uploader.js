import { useRef } from "react";

const Uploader = ({
  files,
  setFiles,
  handleUpload,
  upload_button_name = "업로드",
}) => {
  const fileInputRef = useRef();
  const handleDragOver = (e) => {
    // 파일 열기 방지
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    const newFiles = [];
    for (let i = 0; i < droppedFiles.length; i++) {
      newFiles.push(droppedFiles[i]);
    }
    setFiles(newFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newFiles = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      newFiles.push(selectedFiles[i]);
    }
    // setFiles(Array.from(selectedFiles));
    setFiles(newFiles);
  };

  const handleClickDropArea = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="uploader-container">
      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClickDropArea}
      >
        {files.length === 0
          ? "파일을 드래그하거나 클릭하세요"
          : `${files.length}개 파일 선택됨`}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <button className="btn" onClick={handleUpload}>
        {upload_button_name}
      </button>
    </div>
  );
};

export default Uploader;
