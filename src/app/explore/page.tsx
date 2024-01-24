"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ExplorePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("explore/home");
  }, []);

  return <></>;
}
