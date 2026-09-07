/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import Loader from './Loader';

import {
  Call,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';

import { useUser } from '@clerk/nextjs';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    | 'isScheduleMeeting'
    | 'isJoiningMeeting'
    | 'isInstantMeeting'
    | undefined
  >(undefined);

  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const [isLoading, setIsLoading] = useState(false);

  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user || isLoading) return;

    try {
      setIsLoading(true);

      if (!values.dateTime) {
        toast({
          title: 'زمان جلسه را انتخاب کنید',
        });
        return;
      }

      const id = crypto.randomUUID();

      const call = client.call('default', id);

      if (!call) {
        throw new Error('Failed to create meeting');
      }

      const startsAt = values.dateTime.toISOString();

      const description =
        values.description.trim() || 'جلسه فوری';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetail(call);

      // اگر جلسه فوری است، مستقیماً وارد جلسه شو
      if (!values.description.trim()) {
        router.push(`/meeting/${call.id}`);
        return;
      }

      toast({
        title: 'جلسه با موفقیت ایجاد شد',
        description: 'لینک جلسه آماده اشتراک‌گذاری است.',
      });
    } catch (error) {
      console.error(error);

      toast({
        title: 'خطا در ایجاد جلسه',
        description: 'لطفاً دوباره تلاش کنید.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const joinMeeting = () => {
    const link = values.link.trim();

    if (!link) {
      toast({
        title: 'لینک جلسه را وارد کنید',
      });
      return;
    }

    try {
      const url = new URL(link);

      if (!url.pathname.startsWith('/meeting/')) {
        toast({
          title: 'لینک جلسه نامعتبر است',
        });
        return;
      }

      router.push(url.pathname);
    } catch {
      toast({
        title: 'لینک وارد شده صحیح نیست',
        description: 'لطفاً لینک کامل جلسه را وارد کنید.',
      });
    }
  };

  if (!client || !user) {
    return <Loader />;
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section
      dir="rtl"
      className="
        grid w-full grid-cols-1 gap-5
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {/* جلسه جدید */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="جلسه جدید"
        description="یک جلسه فوری ایجاد کنید"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />

      {/* پیوستن به جلسه */}
      <HomeCard
        img="/icons/join-meeting.svg"
        title="پیوستن به جلسه"
        description="با استفاده از لینک دعوت"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />

      {/* زمان‌بندی جلسه */}
      <HomeCard
        img="/icons/schedule.svg"
        title="برنامه‌ریزی جلسه"
        description="جلسه خود را برای زمان دیگری تنظیم کنید"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />

      {/* ضبط‌ها */}
      <HomeCard
        img="/icons/recordings.svg"
        title="ضبط‌های جلسه"
        description="مشاهده و مدیریت ضبط‌ها"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      {/* ================================
          Schedule Meeting
      ================================= */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="برنامه‌ریزی جلسه"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-medium leading-[22.4px] text-sky-2">
              توضیحات جلسه
            </label>

            <Textarea
              dir="rtl"
              placeholder="موضوع یا توضیحات جلسه را وارد کنید..."
              value={values.description}
              onChange={(e) =>
                setValues({
                  ...values,
                  description: e.target.value,
                })
              }
              className="
                min-h-[110px]
                resize-none
                border border-white/10
                bg-dark-3
                text-right
                text-white
                placeholder:text-white/30
                focus-visible:ring-1
                focus-visible:ring-blue-500/50
                focus-visible:ring-offset-0
              "
            />
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-medium leading-[22.4px] text-sky-2">
              تاریخ و زمان جلسه
            </label>

            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) =>
                setValues({
                  ...values,
                  dateTime: date || new Date(),
                })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="ساعت"
              dateFormat="yyyy/MM/dd - HH:mm"
              locale="fa"
              className="
                w-full rounded-lg
                border border-white/10
                bg-dark-3
                p-3
                text-white
                outline-none
                transition
                focus:border-blue-500/50
              "
            />

            <p className="text-xs text-white/35">
              زمان جلسه را با دقت انتخاب کنید.
            </p>
          </div>
        </MeetingModal>
      ) : (
        /* ================================
           Meeting Created
        ================================= */
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => {
            setMeetingState(undefined);
            setCallDetail(undefined);
          }}
          title="جلسه با موفقیت ایجاد شد"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);

            toast({
              title: 'لینک کپی شد',
              description: 'لینک جلسه در کلیپ‌بورد ذخیره شد.',
            });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="کپی لینک جلسه"
        />
      )}

      {/* ================================
          Join Meeting
      ================================= */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="پیوستن به جلسه"
        className="text-center"
        buttonText="ورود به جلسه"
        handleClick={joinMeeting}
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/45">
            لینک دعوت جلسه را در کادر زیر وارد کنید.
          </p>

          <Input
            dir="ltr"
            type="url"
            placeholder="https://example.com/meeting/..."
            value={values.link}
            onChange={(e) =>
              setValues({
                ...values,
                link: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                joinMeeting();
              }
            }}
            className="
              h-12
              border border-white/10
              bg-dark-3
              text-left
              text-white
              placeholder:text-white/25
              focus-visible:ring-1
              focus-visible:ring-blue-500/50
              focus-visible:ring-offset-0
            "
          />
        </div>
      </MeetingModal>

      {/* ================================
          Instant Meeting
      ================================= */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="شروع جلسه فوری"
        className="text-center"
        buttonText={isLoading ? 'در حال ایجاد...' : 'شروع جلسه'}
        handleClick={createMeeting}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="
              flex h-16 w-16 items-center justify-center
              rounded-2xl
              bg-green-500/10
              ring-1 ring-green-500/20
            "
          >
            <img
              src="/icons/add-meeting.svg"
              alt="جلسه جدید"
              className="h-8 w-8"
            />
          </div>

          <p className="max-w-sm text-sm leading-6 text-white/50">
            یک جلسه جدید ایجاد کنید و همین حالا با دیگران
            به صورت آنلاین گفتگو کنید.
          </p>

          <div
            className="
              w-full rounded-xl
              border border-white/10
              bg-white/[0.03]
              px-4 py-3
              text-right
            "
          >
            <p className="text-xs text-white/30">
              وضعیت
            </p>

            <p className="mt-1 text-sm font-medium text-green-400">
              آماده شروع جلسه
            </p>
          </div>
        </div>
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
