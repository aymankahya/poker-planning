import { render, screen } from '@testing-library/react';
import { Home } from '@/pages/index.ts';

test('Renders Home Page', () => {
  render(<Home />);
  screen.debug();
});
