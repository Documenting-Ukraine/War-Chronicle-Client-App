import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
test('Renders Navbar and Footer', () => {
  const {container} = render(<App />);
  const navbarId = container.querySelector('#navbar')
  const footerId = container.querySelector('#footer')
  expect(footerId).toBeInTheDocument();
  expect(navbarId).toBeInTheDocument();
});
