import { AccountDropdownMenu } from '@/components/header/components';
import GuestPlayer from '@/components/session/header/components/GuestPlayer';
import { useState } from 'react';

export default function SessionPlayer() {
  const [guestId] = useState(false); // To be moved into a custom hook => useGuest

  return guestId ? <GuestPlayer /> : <AccountDropdownMenu />;
}
