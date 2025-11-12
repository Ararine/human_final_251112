import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import { getOauthUserInfo, registerUser } from "../../api/user";
const GoogleButton = ({ setUserInfo, setIsOpen }) => {
  const login = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        const accessToken = res.access_token;

        // 1. idToken 가져오기
        if (!accessToken) {
          alert("토큰을 가져오지 못했습니다.");
          return;
        }

        // const userInfo = await getOauthUserInfo(accessToken);
        // const signup = await registerUser(userInfo);
        // setUserInfo(signup?.result);
        setIsOpen(false);
      } catch (err) {
        console.error("로그인 처리 중 오류:", err);
      }
    },
    onError: () => {
      alert("로그인 실패");
    },
  });

  return <button onClick={() => login()}>Google로 로그인</button>;
};

const Google = ({ setUserInfo, setIsOpen }) => (
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
    <GoogleButton setUserInfo={setUserInfo} setIsOpen={setIsOpen} />
  </GoogleOAuthProvider>
);

export default Google;
