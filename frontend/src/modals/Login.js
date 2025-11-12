import Google from "../components/Google";

const Login = ({ isOpen, setIsOpen, onClose, setUserInfo }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>로그인</h2>
        <div>
          <ul className="flex-center">
            <li>
              <Google setUserInfo={setUserInfo} setIsOpen={setIsOpen} />
            </li>
          </ul>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
