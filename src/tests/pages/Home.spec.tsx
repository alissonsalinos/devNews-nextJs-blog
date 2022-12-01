import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home page', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText, getByRole } = render(
      <Home />,
    );

    screen.logTestingPlaygroundURL();

    expect(getByText('Olá Dev!')).toBeInTheDocument();
    expect(getByAltText('Home image')).toBeInTheDocument();
  });
});