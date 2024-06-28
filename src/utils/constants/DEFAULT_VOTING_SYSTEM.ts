export const DEFAULT_VOTING_SYSTEMS = new Map([
  [
    1,
    {
      values: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, String.fromCodePoint(0x2615), '?'],
      label: 'Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)',
    },
  ],
  [
    2,
    {
      values: [0, '½', 1, 2, 3, 5, 8, 13, 20, 40, 100],
      label: 'Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)',
    },
  ],
  [3, { values: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'], label: 'T-Shirt (XXS, XS, S, M, L, XL, XXL)' }],
]);
