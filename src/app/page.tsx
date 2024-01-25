"use client";

import React, { useEffect } from "react";
import ReduxProvider from "@/component/common/ReduxProvider";
import { useAppSelector } from "@/redux/useReduxHooks";
import { useRouter } from "next/navigation";

function AppLanding() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (authStore.role.toUpperCase() === "USER") {
      router.push("creator/dashboard");
    } else if (authStore.role.toUpperCase() === "SUPER ADMIN") {
      router.push("admin/dashboard");
    } else {
      router.push("explore/home");
    }
     // eslint-disable-next-line
  }, [authStore.role]);

  return null;
}

export default ReduxProvider(AppLanding);
