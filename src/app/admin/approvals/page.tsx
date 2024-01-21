"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";

function Approvals() {
  return <AuthenticatedLayout></AuthenticatedLayout>;
}

export default ReduxProvider(Approvals);
