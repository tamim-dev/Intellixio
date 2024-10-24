import { UserAgent } from '@/views/userAgent';
import { headers } from 'next/headers';

const UserAgentRoot = () => {
  const userAgent = headers().get('user-agent') || 'No user agent detected';

  return <UserAgent serverUserAgent={userAgent} />;
};

export default UserAgentRoot;
