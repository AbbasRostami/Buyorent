"use client";

import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
} from "@/utils/providers/MotionWrapper";
import { FcSearch } from "react-icons/fc";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <MotionDiv
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="text-center relative z-10 backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10">
        <MotionDiv
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <MotionH1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-4"
          >
            ۴۰۴
          </MotionH1>
          <MotionDiv
            className="text-7xl flex justify-center mb-6 filter drop-shadow-lg"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FcSearch className="w-24 h-24" />
          </MotionDiv>
          <MotionH2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-3xl font-semibold text-white mb-4"
          >
            صفحه مورد نظر یافت نشد!
          </MotionH2>
          <MotionP
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-gray-200 mb-8 max-w-md mx-auto text-lg"
          >
            به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس
            دیگری منتقل شده است.
          </MotionP>

          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-6 mb-8 max-w-md mx-auto backdrop-blur-sm shadow-lg"
          >
            <p className="text-amber-100 text-sm font-mono leading-relaxed">
              لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید
            </p>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 rtl:space-x-reverse"
        >
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
          >
            بازگشت به خانه
          </Link>
        </MotionDiv>
      </div>
    </div>
  );
}
