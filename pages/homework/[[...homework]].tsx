"use client";
import Code_playground from "@/components/code_playground";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

const Code = () => {
  const router = useRouter();
  const { lesson, homework } = router.query;
  console.log(lesson, homework);
  return (
    <main className="bg-slate-800 w-full min-h-dvh justify-center flex flex-col text-gray-100">
      <div className="container mx-auto">
        <Code_playground />
      </div>
    </main>
  );
};

export default Code;
