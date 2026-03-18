import { useState } from "react";

export function usePasswordHook() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  function toggleVisiblity(name: "password" | "confirmPassword") {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  return {
    showPassword,
    toggleVisiblity,
    getType: (name: "password" | "confirmPassword") =>
      showPassword[name] ? "text" : "password",
  };
}
