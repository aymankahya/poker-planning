import { Issue } from '@/types/Issue';
import { SessionSetting } from '@/types/SessionSetting';
import { User } from '@/types/User';

export type Session = {
  sessionName: string;
  votingState: string; // To be replaced later with enum of possible states
  issues: Issue[];
  players: User[];
  guests: User[];
  admin: string[];
  settings: SessionSetting;
  currentVotes: { [key: string]: string };
  activeIssue: string;
};
