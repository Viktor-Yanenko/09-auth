import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'Page you are looking for does not exist',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'Page you are looking for does not exist',
    url: `https://08-zustand-rho.vercel.app/404`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
