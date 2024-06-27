import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { VenetianMask } from 'lucide-react';

export default function GuestPlayer() {
  return (
    <Avatar>
      <AvatarFallback>
        <VenetianMask className="h-5 w-5" />
      </AvatarFallback>
    </Avatar>
  );
}
