import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertBoxProps = {
  title: string;
  description: string;
};

export default function AlertBox({ title, description }: AlertBoxProps) {
  return (
    <Alert variant="destructive" className="z-30 mb-5 md:w-[500px]">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
