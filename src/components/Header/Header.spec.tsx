import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('Header component', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText, getByRole } = render(
      <Header />,
    );

    screen.logTestingPlaygroundURL();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Posts')).toBeInTheDocument();
    expect(getByAltText(/devnews!/i)).toBeInTheDocument();
    expect(getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /posts/i })).toBeInTheDocument();
  });

  

});