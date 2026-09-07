'use client';

import Image from 'next/image';

// import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { useToast } from './ui/use-toast';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);

      toast({
        title: 'لینک جلسه کپی شد',
      });
    } catch (error) {
      console.error('Copy link error:', error);

      toast({
        title: 'کپی لینک ناموفق بود',
      });
    }
  };

  return (
    <section
      dir="rtl"
      className="
        group relative
        flex min-h-[258px]
        w-full
        flex-col
        justify-between
        overflow-hidden
        rounded-3xl
        border border-white/[0.07]
        bg-[#10151c]
        px-5 py-6
        text-white
        shadow-xl shadow-black/10
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/[0.12]
        hover:shadow-2xl hover:shadow-black/20
        xl:max-w-[568px]
      "
    >
      {/* Decorative Glow */}
      <div
        className="
          pointer-events-none absolute
          -right-20 -top-20
          h-44 w-44
          rounded-full
          bg-blue-500/[0.08]
          blur-[80px]
          transition-all duration-500
          group-hover:bg-blue-500/[0.13]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24 -left-20
          h-40 w-40
          rounded-full
          bg-purple-500/[0.06]
          blur-[80px]
        "
      />

      {/* Header */}
      <article className="relative flex flex-col gap-5">
        {/* Meeting Icon */}
        <div
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            border border-white/10
            bg-white/[0.05]
            shadow-lg
            transition-transform duration-300
            group-hover:scale-105
          "
        >
          <Image
            src={icon}
            alt="آیکون جلسه"
            width={25}
            height={25}
            className="object-contain"
          />
        </div>

        {/* Meeting Information */}
        <div className="flex flex-col gap-2">
          <h1 className="line-clamp-2 text-xl font-bold leading-8 tracking-tight sm:text-2xl">
            {title}
          </h1>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

            <p className="text-sm font-medium text-white/45 sm:text-base">
              {date}
            </p>
          </div>
        </div>
      </article>

      {/* Bottom Section */}
      <article className="relative mt-7 flex flex-col gap-5">
        {/* Attendees */}
        <div className="flex items-center justify-between">
          <div className="relative flex h-10 w-[175px]">
            {avatarImages.slice(0, 5).map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`شرکت‌کننده ${index + 1}`}
                width={40}
                height={40}
                className="
                  absolute
                  rounded-full
                  border-[3px]
                  border-[#10151c]
                  object-cover
                "
                style={{
                  right: index * 28,
                  zIndex: avatarImages.length - index,
                }}
              />
            ))}

            <div
              className="
                absolute
                right-[140px]
                flex size-10
                items-center justify-center
                rounded-full
                border-[3px]
                border-[#10151c]
                bg-[#252d37]
                text-xs font-bold
                text-white/70
              "
            >
              +۵
            </div>
          </div>

          {isPreviousMeeting && (
            <span
              className="
                rounded-full
                border border-white/5
                bg-white/[0.04]
                px-3 py-1.5
                text-[11px] font-medium
                text-white/35
              "
            >
              جلسه گذشته
            </span>
          )}
        </div>

        {/* Actions */}
        {!isPreviousMeeting && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={handleClick}
              className="
                h-11
                rounded-xl
                border border-blue-400/20
                bg-blue-600
                px-3
                text-xs font-bold
                text-white
                shadow-lg shadow-blue-600/10
                transition-all duration-200
                hover:bg-blue-500
                hover:shadow-xl hover:shadow-blue-600/20
                active:scale-[0.98]
              "
            >
              {buttonIcon1 && (
                <Image
                  src={buttonIcon1}
                  alt=""
                  width={18}
                  height={18}
                  className="object-contain"
                />
              )}

              <span className="mr-1">
                {buttonText || 'ورود به جلسه'}
              </span>
            </Button>

            <Button
              type="button"
              onClick={handleCopyLink}
              className="
                h-11
                rounded-xl
                border border-white/[0.07]
                bg-white/[0.05]
                px-3
                text-xs font-bold
                text-white/75
                transition-all duration-200
                hover:bg-white/[0.09]
                hover:text-white
                active:scale-[0.98]
              "
            >
              <Image
                src="/icons/copy.svg"
                alt=""
                width={18}
                height={18}
                className="object-contain opacity-80"
              />

              <span className="mr-1">
                کپی لینک
              </span>
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
