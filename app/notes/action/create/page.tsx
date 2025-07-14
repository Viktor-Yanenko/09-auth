import { Metadata } from 'next';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create Note',
  description:
    'Creating note in simple app for managing personal notes - NoteHub',
  openGraph: {
    title: 'Create Note',
    description:
      'Creating note in simple app for managing personal notes - NoteHub',
    url: 'https://08-zustand-rho.vercel.app/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note creation interface in NoteHub - a simple app for managing personal notes',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Note',
    description: 'Simple app for managing personal notes',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default async function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
