'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <section
      dir="rtl"
      onClick={handleClick}
      role={handleClick ? 'button' : undefined}
      tabIndex={handleClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (handleClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        `
          group relative
          flex min-h-[260px]
          w-full
          flex-col
          justify-between
          overflow-hidden
          rounded-3xl
          border border-white/[0.08]
          bg-[#10151c]
          px-5 py-6
          text-white
          shadow-xl shadow-black/10
          transition-all duration-300
          hover:-translate-y-1
          hover:border-white/[0.14]
          hover:shadow-2xl hover:shadow-black/20
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500/50
          xl:max-w-[270px]
        `,
        handleClick && 'cursor-pointer',
        className,
      )}
    >
      {/* Decorative Glow */}
      <div
        className="
          pointer-events-none absolute
          -right-20 -top-20
          h-48 w-48
          rounded-full
          bg-blue-500/10
          blur-[85px]
          transition-all duration-500
          group-hover:bg-blue-500/15
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24 -left-20
          h-44 w-44
          rounded-full
          bg-purple-500/[0.07]
          blur-[80px]
        "
      />

      {/* Icon */}
      <div
        className="
          relative
          flex h-14 w-14
          items-center justify-center
          rounded-2xl
          border border-white/10
          bg-white/[0.05]
          shadow-lg
          backdrop-blur-xl
          transition-all duration-300
          group-hover:scale-105
          group-hover:bg-white/[0.08]
        "
      >
        <Image
          src={img}
          alt=""
          width={28}
          height={28}
          className="
            object-contain
            transition-transform duration-300
            group-hover:scale-110
          "
        />
      </div>

      {/* Content */}
      <div className="relative mt-auto flex flex-col gap-2.5 pt-8">
        <h1
          className="
            text-xl font-bold
            leading-8
            tracking-tight
            sm:text-2xl
          "
        >
          {title}
        </h1>

        <p
          className="
            max-w-[230px]
            text-sm
            font-medium
            leading-6
            text-white/45
            sm:text-base
          "
        >
          {description}
        </p>

        {/* Hover Arrow */}
        {handleClick && (
          <div
            className="
              mt-2
              flex items-center
              gap-2
              text-xs font-semibold
              text-blue-400
              opacity-0
              translate-y-1
              transition-all duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <span>مشاهده</span>

            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeCard;
