"use client"
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";

function AdminSettings() {
  return <AuthenticatedLayout></AuthenticatedLayout>;
}

export default ReduxProvider(AdminSettings);
