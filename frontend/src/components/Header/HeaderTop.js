import Login from "../../modals/Login";
import { useState } from "react";
const HeaderTop = ({ userInfo, setUserInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = async () => {
    try {
      console.log("로그아웃 구현 필요");
    } catch (err) {
      console.log("login error: ", err);
    }
  };
  return (
    <>
      <Login
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setUserInfo={setUserInfo}
        onClose={() => setIsModalOpen(false)}
      />
      <p>여기는 헤더 상단입니다</p>
    </>
  );
};

export default HeaderTop;
