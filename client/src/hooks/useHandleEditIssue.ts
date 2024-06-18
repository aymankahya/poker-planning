import { useToast } from '@/components/ui/use-toast';
import useSocket from '@/hooks/useSocket';
import { getRoomIDFromUrl } from '@/utils';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useHandleEditIssue(
  issueTypeRef: React.RefObject<HTMLParagraphElement>,
  issueTitleRef: React.RefObject<HTMLParagraphElement>,
) {
  const { toast } = useToast();
  const { socket } = useSocket();
  const location = useLocation();
  const [editCardActive, setCardEditionActive] = useState<boolean>(false);
  const previousValue = useRef({ title: '', type: '' });

  const handleEditIssue = () => {
    setCardEditionActive(true);
    previousValue.current = {
      type: issueTypeRef.current?.innerText ?? '',
      title: issueTitleRef.current?.innerText ?? '',
    };

    issueTitleRef.current?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });

    issueTypeRef.current?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  };

  const handleCancelEditIssue = () => {
    setCardEditionActive(false);
    if (issueTypeRef.current && issueTitleRef.current) {
      issueTitleRef.current.innerHTML = previousValue.current.title;
      issueTypeRef.current.innerHTML = previousValue.current.type;
    }
  };

  const confirmEditIssue = (issueId: string) => {
    if (issueTypeRef.current?.innerText === '' || issueTitleRef.current?.innerHTML === '') {
      return toast({
        title: 'Empty type or title is not valid',
        description: 'Please enter valid type or title to edit the issue',
        variant: 'destructive',
      });
    }
    setCardEditionActive(false);
    return socket?.emit(
      'edit-issue',
      getRoomIDFromUrl(location.pathname),
      issueId,
      issueTitleRef.current?.innerText,
      issueTypeRef.current?.innerText,
    );
  };

  return { editCardActive, handleEditIssue, handleCancelEditIssue, confirmEditIssue };
}
