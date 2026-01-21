import React from "react";

const FormInput = ({ label, type = "text", name, value, onChange, placeholder, error }) => {
  return (
    <div className="flex flex-col mb-4 w-full text-left">
      <label className="text-sm font-semibold mb-1 !text-black dark:!text-white">{label}</label>

      {/* 입력창 */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-3 rounded-md transition-all border-b-2 
          bg-gray-200 dark:bg-zinc-800 
          !text-black dark:!text-white 
          ${error ? "border-orange-500" : "border-transparent focus:border-red-500"} 
          focus:outline-none placeholder-gray-500`}
      />

      {/* 에러 메시지 */}
      {error && <span className="text-orange-500 text-xs mt-1 italic">{error}</span>}
    </div>
  );
};

export default FormInput;
