import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { mockData } from '../helpers/data';
import userEvent from '@testing-library/user-event';

test('Testando a Tabela e os filtros', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, App!/i);
  expect(linkElement).toBeInTheDocument();
});
