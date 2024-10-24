'use client';

import { BackToHome } from '@/components/backToHome/backToHome';
import { useUserAgentContext } from '@/components/providers/userAgentProvider';
import { useEffect, useState } from 'react';

interface UserAgentProps {
  serverUserAgent: string;
}

export const UserAgent = ({ serverUserAgent }: UserAgentProps) => {
  const { userAgent: contextUserAgent } = useUserAgentContext();
  const [userAgent, setUserAgent] = useState<string>(
    serverUserAgent || contextUserAgent || 'No user agent detected',
  );

  useEffect(() => {
    if (contextUserAgent) {
      setUserAgent(contextUserAgent);
    }
  }, [contextUserAgent]);

  return (
    <div>
      <BackToHome />

      {userAgent && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>
          <div className="border p-2">{userAgent}</div>
        </div>
      )}

      {!userAgent && <div>No user agent</div>}
    </div>
  );
};
