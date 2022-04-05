import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from './test-utils';
import App from './App';
test('Renders Navbar and Footer', () => {
  const {container} = customRender(<App />);
  const navbarId = container.querySelector('#navbar')
  const footerId = container.querySelector('#footer')
  expect(footerId).toBeInTheDocument();
  expect(navbarId).toBeInTheDocument();
});
