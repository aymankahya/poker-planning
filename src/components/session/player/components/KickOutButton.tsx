import HoverCard from '@/components/common/HoverCard';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function KickOutButton() {
  return (
    <HoverCard
      trigger={
        <Button className="rounded-full bg-red-500 p-2 hover:bg-red-600">
          <X />
        </Button>
      }
      hoverContent={<div className="text-sm text-white p-2 w-fit border-0 bg-slate-700 rounded-md ">Kick out</div>}
      delay={10}
    />
  );
}
