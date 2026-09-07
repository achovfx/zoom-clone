'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PermissionCardProps {
title: string;
iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
return ( <section
   dir="rtl"
   className="
     relative flex min-h-screen w-full
     items-center justify-center
     overflow-hidden
     bg-[#05070a]
     px-4 py-6
     text-white
   "
 >
{/* Background glow */} <div
     className="
       pointer-events-none absolute
       -right-32 -top-32
       h-80 w-80
       rounded-full
       bg-blue-500/10
       blur-[120px]
     "
   />

```
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

  <Card
    className="
      relative
      w-full max-w-[520px]
      overflow-hidden
      rounded-3xl
      border border-white/10
      bg-[#10151c]/95
      p-0
      text-white
      shadow-2xl shadow-black/30
      backdrop-blur-2xl
    "
  >
    {/* Card glow */}
    <div
      className="
        pointer-events-none absolute
        -right-24 -top-24
        h-48 w-48
        rounded-full
        bg-blue-500/10
        blur-[80px]
      "
    />

    <CardContent className="relative p-5 sm:p-7">
      <div className="flex flex-col gap-7 sm:gap-8">
        {/* Icon + message */}
        <div className="flex flex-col items-center gap-5">
          {iconUrl && (
            <div
              className="
                flex h-20 w-20
                items-center justify-center
                rounded-2xl
                border border-white/10
                bg-white/[0.05]
                shadow-xl
                backdrop-blur-xl
              "
            >
              <Image
                src={iconUrl}
                width={56}
                height={56}
                alt=""
                className="object-contain"
              />
            </div>
          )}

          <div className="flex flex-col items-center gap-2">
            <p
              className="
                max-w-[420px]
                text-center
                text-lg font-bold
                leading-8
                tracking-tight
                sm:text-xl
              "
            >
              {title}
            </p>

            <p className="text-center text-xs leading-5 text-white/35">
              برای ادامه می‌توانید به صفحه اصلی برگردید.
            </p>
          </div>
        </div>

        {/* Back button */}
        <Button
          asChild
          className="
            h-12 w-full
            rounded-xl
            border border-blue-400/20
            bg-blue-600
            px-5
            text-sm font-bold
            text-white
            shadow-lg shadow-blue-600/10
            transition-all duration-200
            hover:bg-blue-500
            hover:shadow-xl hover:shadow-blue-600/20
            active:scale-[0.98]
            focus-visible:ring-2
            focus-visible:ring-blue-500/50
            focus-visible:ring-offset-0
          "
        >
          <Link href="/">
            بازگشت به صفحه اصلی
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
</section>

);
};

export default Alert;
