"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminAprovalStoryPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/approvals");
    // eslint-disable-next-line
  }, []);
  return null;
}
