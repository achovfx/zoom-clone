'use client';

import Image from 'next/image';

const Loader = () => {
  return (
    <div
      dir="rtl"
      className="
        relative flex
        h-screen w-full
        items-center justify-center
        overflow-hidden
        bg-[#05070a]
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none absolute
          -right-32 -top-32
          h-80 w-80
          rounded-full
          bg-blue-500/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-32 -left-32
          h-80 w-80
          rounded-full
          bg-purple-500/10
          blur-[120px]
        "
      />

      {/* Loader */}
      <div
        className="
          relative flex
          h-24 w-24
          items-center justify-center
          rounded-3xl
          border border-white/10
          bg-white/[0.04]
          shadow-2xl
          backdrop-blur-xl
        "
      >
        {/* Animated Ring */}
        <div
          className="
            absolute inset-2
            animate-spin
            rounded-full
            border-2
            border-transparent
            border-t-blue-500
            border-r-blue-400/30
          "
        />

        <Image
          src="/icons/loading-circle.svg"
          alt="در حال بارگذاری"
          width={42}
          height={42}
          className="relative z-10 opacity-90"
        />
      </div>
    </div>
  );
};

export default Loader;
