'use client';

import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList, ChevronUp } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import Loader from './Loader';
import EndCallButton from './EndCallButton';
// import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isPersonalRoom = !!searchParams.get('personal');

  const [layout, setLayout] =
    useState<CallLayoutType>('speaker-left');

  const [showParticipants, setShowParticipants] =
    useState(false);

  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;

      case 'speaker-right':
        return (
          <SpeakerLayout participantsBarPosition="left" />
        );

      default:
        return (
          <SpeakerLayout participantsBarPosition="right" />
        );
    }
  };

  const layoutOptions: {
    value: CallLayoutType;
    label: string;
    description: string;
  }[] = [
    {
      value: 'grid',
      label: 'نمای شبکه‌ای',
      description: 'نمایش همه شرکت‌کنندگان',
    },
    {
      value: 'speaker-left',
      label: 'سخنران سمت چپ',
      description: 'تمرکز روی سخنران',
    },
    {
      value: 'speaker-right',
      label: 'سخنران سمت راست',
      description: 'تمرکز روی سخنران',
    },
  ];

  const currentLayout = layoutOptions.find(
    (item) => item.value === layout,
  );

  return (
    <section
      dir="rtl"
      className="
        relative h-screen w-full overflow-hidden
        bg-[#05070a] text-white
      "
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Video Area */}
      <div className="relative flex size-full items-center justify-center px-2 pb-24 pt-2 sm:px-4">
        <div
          className="
            relative flex size-full
            items-center justify-center
            overflow-hidden rounded-2xl
          "
        >
          <CallLayout />
        </div>

        {/* Participants Panel */}
        <div
          className={cn(
            `
              absolute left-2 top-2 z-30
              h-[calc(100vh-100px)]
              w-[280px]
              overflow-hidden
              rounded-2xl
              border border-white/10
              bg-[#11161d]/95
              shadow-2xl
              backdrop-blur-xl
              transition-all duration-300
            `,
            showParticipants
              ? 'translate-x-0 opacity-100'
              : '-translate-x-[110%] opacity-0 pointer-events-none',
          )}
        >
          <CallParticipantsList
            onClose={() => setShowParticipants(false)}
          />
        </div>
      </div>

      {/* Bottom Controls */}
      <div
        className="
          fixed bottom-3 left-1/2 z-50
          flex -translate-x-1/2
          items-center justify-center
          gap-2
          rounded-2xl
          border border-white/10
          bg-[#11161d]/90
          px-2 py-2
          shadow-2xl
          backdrop-blur-xl
          sm:bottom-5 sm:gap-3 sm:px-3
        "
      >
        {/* Main Call Controls */}
        <div className="flex items-center">
          <CallControls
            onLeave={() => router.push('/')}
          />
        </div>

        {/* Layout Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="
              group flex h-11 items-center
              gap-2 rounded-xl
              border border-white/5
              bg-[#19232d]
              px-3
              transition-all
              hover:bg-[#25323e]
              focus:outline-none
            "
            title="تغییر چیدمان"
          >
            <LayoutList
              size={19}
              className="text-white/80"
            />

            <span className="hidden text-xs font-medium text-white/70 lg:block">
              {currentLayout?.label}
            </span>

            <ChevronUp
              size={14}
              className="
                hidden text-white/40
                transition-transform
                group-data-[state=open]:rotate-180
                lg:block
              "
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            sideOffset={10}
            className="
              min-w-[220px]
              rounded-xl
              border border-white/10
              bg-[#11161d]
              p-1.5
              text-white
              shadow-2xl
              backdrop-blur-xl
            "
          >
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-white/40">
                چیدمان جلسه
              </p>
            </div>

            {layoutOptions.map((item, index) => (
              <div key={item.value}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.value)}
                  className={cn(
                    `
                      cursor-pointer rounded-lg
                      px-3 py-2.5
                      outline-none
                      transition
                      focus:bg-white/10
                    `,
                    layout === item.value &&
                      'bg-blue-500/10 text-blue-400',
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">
                        {item.label}
                      </p>

                      <p className="mt-0.5 text-[11px] text-white/35">
                        {item.description}
                      </p>
                    </div>

                    {layout === item.value && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>

                {index < layoutOptions.length - 1 && (
                  <DropdownMenuSeparator className="my-1 bg-white/5" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Call Stats */}
        <div
          className="
            flex h-11 items-center
            rounded-xl
            border border-white/5
            bg-[#19232d]
            transition
            hover:bg-[#25323e]
          "
          title="آمار تماس"
        >
          <CallStatsButton />
        </div>

        {/* Participants */}
        <button
          type="button"
          onClick={() =>
            setShowParticipants((prev) => !prev)
          }
          className={cn(
            `
              flex h-11 items-center
              gap-2 rounded-xl
              border border-white/5
              px-3
              transition-all
            `,
            showParticipants
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-[#19232d] text-white hover:bg-[#25323e]',
          )}
          title="شرکت‌کنندگان"
          aria-label="نمایش شرکت‌کنندگان"
        >
          <Users size={19} />

          <span className="hidden text-xs font-medium lg:block">
            شرکت‌کنندگان
          </span>
        </button>

        {/* End Call */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
