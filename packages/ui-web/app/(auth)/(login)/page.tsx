import dynamic from "next/dynamic";
import React from "react";
const LoginForm = dynamic(() => import("@/app/(auth)/(login)/loginForm"), {
  ssr: false, // This ensures the component is only rendered on the client side
});

function Login() {
  return <LoginForm />;
}

export default Login;
