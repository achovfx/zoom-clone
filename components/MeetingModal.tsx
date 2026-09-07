'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        dir="rtl"
        className="
          w-[calc(100%-24px)]
          max-w-[520px]
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-[#10151c]/95
          p-0
          text-white
          shadow-2xl
          backdrop-blur-2xl
          sm:w-full
        "
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-500/10 blur-[80px]" />
        </div>

        <div className="relative flex flex-col gap-6 px-5 py-7 sm:px-7 sm:py-8">
          {/* Header */}
          <div
            className={cn(
              'flex flex-col gap-3',
              image ? 'items-center text-center' : 'items-start',
            )}
          >
            {/* Image */}
            {image && (
              <div
                className="
                  flex h-20 w-20
                  items-center justify-center
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.04]
                  shadow-lg
                "
              >
                <Image
                  src={image}
                  alt="وضعیت جلسه"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            )}

            {/* Title */}
            <h1
              className={cn(
                'text-2xl font-bold leading-9 tracking-tight sm:text-3xl',
                className,
              )}
            >
              {title}
            </h1>
          </div>

          {/* Content */}
          {children && (
            <div className="flex flex-col gap-5">
              {children}
            </div>
          )}

          {/* Action Button */}
          {handleClick && (
            <Button
              type="button"
              onClick={handleClick}
              className={cn(
                `
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
                `,
                buttonClassName,
              )}
            >
              <span className="flex items-center justify-center gap-2">
                {buttonIcon && (
                  <Image
                    src={buttonIcon}
                    alt=""
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                )}

                <span>
                  {buttonText || 'برنامه‌ریزی جلسه'}
                </span>
              </span>
            </Button>
          )}

          {/* Bottom hint */}
          <div className="flex items-center justify-center">
            <p className="text-center text-[11px] leading-5 text-white/25">
              برای بستن پنجره می‌توانید روی خارج از آن کلیک کنید.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
