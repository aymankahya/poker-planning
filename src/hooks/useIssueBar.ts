import { IssueBarContext } from '@/context/IssueBarProvider';
import { useContext } from 'react';

export default function useIssueBar() {
  const issueBarContext = useContext(IssueBarContext);

  if (issueBarContext === undefined) {
    throw new Error('useIssueBar must be inside an IssueBarProvider');
  }

  return { issueBarContext };
}
