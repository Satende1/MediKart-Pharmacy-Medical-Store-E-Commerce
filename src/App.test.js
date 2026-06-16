import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home page on root path', () => {
  render(
      <App />
  );
  // Since home page is empty, just check if Navbar renders
  expect(screen.getAllByText("MediKart")[0]).toBeInTheDocument();
});