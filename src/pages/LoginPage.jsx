import React, { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase/client";
import FormInput from "../components/FormInput";
import { useSupabaseAuth } from "../supabase/context";

const LoginPage = () => {
  const navigate = useNavigate();
  /* Context API: 전역 상태 업데이트 함수 가져오기 */
  const { getUserInfo, loginWithKakao } = useSupabaseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  /* 유효성 검사 */
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "이메일을 입력해주세요.";
    if (!password) newErrors.password = "비밀번호를 입력해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* 로그인 처리: Supabase 인증 및 전역 상태 동기화 */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    /* Supabase 이메일, 비밀번호 로그인 실행 */
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("로그인 정보를 확인해주세요!");
    } else {
      await getUserInfo();

      alert(`${data.user.user_metadata.userName || "사용자"}님 환영합니다!`);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black/80 p-8 rounded-lg w-full max-w-[400px] border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-8">로그인</h1>
        <form onSubmit={handleLogin}>
          <FormInput
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <FormInput
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded mt-6 hover:bg-red-700">
            로그인
          </button>
        </form>

        {/* 카톡 로그인 버튼 */}
        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-800 w-full"></div>
            <span className="bg-black px-2 text-gray-500 text-sm absolute">또는</span>
          </div>

          <button
            type="button"
            onClick={loginWithKakao}
            className="w-full bg-[#FEE500] text-black font-bold py-3 rounded flex items-center justify-center hover:bg-[#FADB00] transition-colors"
          >
            카카오톡으로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
