import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand', () => {
  render(<App />);
  const brand = screen.getByText(/OceanShop/i);
  expect(brand).toBeInTheDocument();
});
