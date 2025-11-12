import HeaderTop from "./HeaderTop";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <>
      <HeaderTop userInfo={userInfo} setUserInfo={setUserInfo} />
      <p>여기는 헤더입니다</p>
    </>
  );
};

export default Header;
