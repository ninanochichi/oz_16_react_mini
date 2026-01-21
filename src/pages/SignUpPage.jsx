import React, { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase/client";
import FormInput from "../components/FormInput";

const SignUpPage = () => {
  const navigate = useNavigate();

  /* 상태 관리 : 입력 및 에러 메세지 */
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  /* 입력값 검사 : 이름, 이메일, 비밀번호 확인 */
  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z0-9가-힣]{2,8}$/; // 2~8자 숫자, 한글, 영어
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/; // 영어 대/소문자 + 숫자

    if (!nameRegex.test(formData.userName)) newErrors.userName = "이름은 2~8자, 한글/영어/숫자만 가능합니다.";
    if (!emailRegex.test(formData.email)) newErrors.email = "유효한 이메일 형식을 입력해주세요.";
    if (!passwordRegex.test(formData.password)) newErrors.password = "대/소문자 및 숫자를 포함해야 합니다.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* 회원가입 : Supabase aust 호출 사용자 정보 저장 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          // 나중에 NavBar가 꺼내 쓰기 편하도록 이름을 맞춰줍니다.
          userName: formData.userName,
          profile_image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
        },
      },
    });

    if (error) alert(error.message);
    else {
      alert("회원가입 성공!");
      navigate("/login");
    }
  };

  return (
    /* 페이지 컨테이너 */
    <div className="flex items-center justify-center min-h-screen !bg-white dark:!bg-black px-4 transition-colors">
      {/* 회원가입 폼 */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] p-10 !bg-gray-50 dark:!bg-zinc-900 rounded-md shadow-2xl border border-gray-200 dark:border-gray-800"
      >
        <h1 className="text-3xl font-bold !text-gray-900 dark:!text-white mb-8 text-left">회원가입</h1>
        {/* 입력칸 */}
        <FormInput
          label="이름"
          name="userName"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          error={errors.userName}
          placeholder="이름을 입력해주세요"
        />
        <FormInput
          label="이메일"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          placeholder="이메일"
        />
        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          placeholder="비밀번호"
        />
        <FormInput
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          placeholder="비밀번호 확인"
        />
        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-[#E50914] text-white py-3 rounded font-bold mt-6 hover:bg-[#b20710] transition-colors"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
