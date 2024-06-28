export default function getVotingSystemLabels(
  votingSystem: Map<
    number,
    {
      values: (string | number)[];
      label: string;
    }
  >,
) {
  const votingSystemLabels: {
    label: string;
    id: number;
  }[] = [];
  votingSystem.forEach((value, key) => {
    votingSystemLabels.push({ id: key, label: value.label });
  });

  return votingSystemLabels;
}
