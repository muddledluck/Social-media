"use client";
import { useUserWeb } from "@/hooks/user/useUserWeb";
import { useTokenRefresh } from "@social-media/ui-core/src/hooks/auth/useTokenRefresh";
import React from "react";

function SubApp() {
  const useUserProps = useUserWeb();
  useTokenRefresh({
    useUserProps,
  });
  return <></>;
}

export default SubApp;
