import React from 'react';
import { render } from '@testing-library/react';
import RandomPage from './RandomPage';

test('renders learn react link', () => {
  const { getByText } = render(<RandomPage />);
  const linkElement = getByText(/the content is/i);
  expect(linkElement).toBeInTheDocument();
});