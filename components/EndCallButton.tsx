'use client';

import { useState } from 'react';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';

import { Button } from './ui/button';

const EndCallButton = () => {
const call = useCall();
const router = useRouter();

const [isEnding, setIsEnding] = useState(false);

if (!call) {
throw new Error(
'useStreamCall must be used within a StreamCall component.',
);
}

const { useLocalParticipant } = useCallStateHooks();
const localParticipant = useLocalParticipant();

const isMeetingOwner =
localParticipant &&
call.state.createdBy &&
localParticipant.userId === call.state.createdBy.id;

if (!isMeetingOwner) return null;

const endCall = async () => {
if (isEnding) return;
try {
  setIsEnding(true);

  await call.endCall();

  router.push('/');
} catch (error) {
  console.error('End call error:', error);
  setIsEnding(false);
}

};

return ( <Button
   type="button"
   onClick={endCall}
   disabled={isEnding}
   title="پایان جلسه برای همه"
   aria-label="پایان جلسه برای همه"
   className="
     group
     flex h-11 items-center justify-center
     gap-2
     rounded-xl
     border border-red-400/20
     bg-red-500/10
     px-3
     text-red-400
     transition-all duration-200
     hover:border-red-400/30
     hover:bg-red-500/20
     hover:text-red-300
     active:scale-[0.97]
     disabled:cursor-not-allowed
     disabled:opacity-60
     lg:px-4
   "
 >
{isEnding ? ( <Loader2
       size={18}
       className="animate-spin"
     />
) : ( <LogOut
       size={18}
       className="
         transition-transform duration-200
         group-hover:-translate-x-0.5
       "
     />
)}
  <span className="hidden text-xs font-bold lg:block">
    {isEnding ? 'در حال پایان...' : 'پایان جلسه برای همه'}
  </span>
</Button>
);
};

export default EndCallButton;
