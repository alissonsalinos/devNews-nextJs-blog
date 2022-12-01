import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Post, { getStaticProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';


const post =
  {
    slug: 'teste-new-post',
    title: 'Title for new post',
    content: '<p>Post content</p>',
    updatedAt: '25 de dezembro de 2021'
  };

jest.mock('../../services/prismic');

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        isFallback: false,
      };
    },
  };
});

describe('Post page', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Post post={post} />,
    );

    expect(getByText('Title for new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
            data: {
              title: [
                {type: 'heading', text: 'My new post'},
              ],
              content:  [
                {type: 'paragraph', text: '<p>Post content</p>'},
              ],
            },
            last_publication_date: '11-28-2022',
          }),
    } as any);

    const response = await getStaticProps({
      params: {slug: 'teste-new-post'}
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post:
            {
              slug: 'teste-new-post',
              title: 'My new post',
              content: '<p>Post content</p>',
              updatedAt: '28 de novembro de 2022'
            },
        },
        "revalidate": 43200,
      }),
    );
  });
});