'use client';

import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();

  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();

  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  // جلسه هنوز شروع نشده
  if (callTimeNotArrived) {
    return (
      <div dir="rtl" className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0f] px-4">
        <Alert
          title={`جلسه هنوز شروع نشده است. زمان شروع: ${callStartsAt.toLocaleString(
            'fa-IR',
          )}`}
        />
      </div>
    );
  }

  // جلسه به پایان رسیده
  if (callHasEnded) {
    return (
      <div dir="rtl" className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0f] px-4">
        <Alert
          title="این جلسه توسط میزبان به پایان رسیده است."
          iconUrl="/icons/call-ended.svg"
        />
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="
        relative flex min-h-screen w-full items-center justify-center
        overflow-hidden bg-[#07070b] px-4 py-8 text-white
      "
    >
      {/* پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* کارت اصلی */}
      <div
        className="
          relative z-10 w-full max-w-2xl
          rounded-3xl border border-white/10
          bg-white/[0.045] p-5 shadow-2xl
          backdrop-blur-2xl sm:p-7
        "
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div
            className="
              mx-auto mb-4 flex h-14 w-14 items-center justify-center
              rounded-2xl border border-white/10
              bg-white/10 shadow-lg
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            آماده ورود به جلسه هستید؟
          </h1>

          <p className="mt-2 text-sm text-white/50 sm:text-base">
            قبل از ورود، دوربین و میکروفون خود را بررسی کنید.
          </p>
        </div>

        {/* Video Preview */}
        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-white/10 bg-black/30
            shadow-xl
          "
        >
          <VideoPreview />

          {/* Preview label */}
          <div
            className="
              absolute right-3 top-3 rounded-full
              border border-white/10 bg-black/50
              px-3 py-1.5 text-xs font-medium
              text-white/80 backdrop-blur-md
            "
          >
            پیش‌نمایش دوربین
          </div>
        </div>

        {/* Controls */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Mic / Camera */}
          <label
            className="
              group flex cursor-pointer items-center gap-3
              rounded-xl border border-white/10
              bg-white/[0.04] px-4 py-3
              transition-all duration-200
              hover:border-white/20 hover:bg-white/[0.07]
            "
          >
            <input
              type="checkbox"
              checked={isMicCamToggled}
              onChange={(e) => setIsMicCamToggled(e.target.checked)}
              className="
                h-4 w-4 cursor-pointer rounded
                border-white/20 bg-white/10
                accent-blue-500
              "
            />

            <span className="text-sm font-medium text-white/80">
              ورود بدون میکروفون و دوربین
            </span>
          </label>

          {/* Device Settings */}
          <div
            className="
              flex items-center justify-center
              rounded-xl border border-white/10
              bg-white/[0.04] px-4 py-2
              transition hover:bg-white/[0.07]
            "
          >
            <DeviceSettings />
          </div>
        </div>

        {/* Join Button */}
        <Button
          className="
            mt-5 h-12 w-full rounded-xl
            border border-emerald-400/20
            bg-emerald-500 px-5
            text-base font-bold text-white
            shadow-lg shadow-emerald-500/10
            transition-all duration-200
            hover:bg-emerald-400
            hover:shadow-xl hover:shadow-emerald-500/20
            active:scale-[0.98]
          "
          onClick={async () => {
            await call.join();
            setIsSetupComplete(true);
          }}
        >
          <span className="flex items-center justify-center gap-2">
            ورود به جلسه

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5l7 7m0 0l-7 7m7-7H4"
              />
            </svg>
          </span>
        </Button>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-white/30">
          با ورود به جلسه، می‌توانید تنظیمات صدا و تصویر خود را تغییر دهید.
        </p>
      </div>
    </div>
  );
};

export default MeetingSetup;
