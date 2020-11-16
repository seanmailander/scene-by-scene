import { render, screen } from '@testing-library/react';
import App from './App';

// teh witches 531219

/*
-> 350 devil wears prada

-> 508 love actually

-> 562 die hard

-> 381288 split
-> 450465 glass
*/

// the new mutants 340102

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
