import { DEFAULT_VOTING_SYSTEMS } from '@/utils/constants/DEFAULT_VOTING_SYSTEM';

export default function getVotingSystem(customVotingSystem: { values: (string | number)[]; label: string }[]) {
  const tempMap: Map<
    number,
    {
      values: (string | number)[];
      label: string;
    }
  > = new Map();
  customVotingSystem.forEach((votingSys, index) => tempMap.set(index + 4, votingSys));

  return new Map([...DEFAULT_VOTING_SYSTEMS, ...tempMap]);
}
