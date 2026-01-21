import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "./client";

/* 전역 상태 컨텍스트 */
const AuthContext = createContext();

export const SupabaseProvider = ({ children }) => {
  /* 유저 정보 전역 : null이면 로그아웃 */
  const [user, setUser] = useState(null);

  /* 카카오 로그인 실행 */
  const loginWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        /* 로그인하고 사이트로 다시 */
        redirectTo: window.location.origin,
        scopes: "profile_nickname profile_image",
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) console.error("카카오 로그인 에러:", error.message);
  };

  /* 로그아웃 : Supabase 세션 종료, 초기화 */
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("userInfo");
    setUser(null);
  }, []);

  /* 유저 정보 업데이트 */
  const getUserInfo = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      /* 객체 */
      const userInfo = {
        id: session.user.id,
        email: session.user.email || "Email Hidden",
        userName: session.user.user_metadata.full_name || session.user.user_metadata.name || "카카오 사용자",
        profileImageUrl: session.user.user_metadata.avatar_url || session.user.user_metadata.profile_image,
      };
      /* 로컬스토리지 저장 : 새로고침 유지 */
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(userInfo);
    } else {
      localStorage.removeItem("userInfo");
      setUser(null);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  /* 외부 컴포넌트 */
  return <AuthContext.Provider value={{ user, getUserInfo, logout, loginWithKakao }}>{children}</AuthContext.Provider>;
};
/* 커스텀 훅 */
export const useSupabaseAuth = () => useContext(AuthContext);
