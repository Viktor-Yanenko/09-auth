'use client';

import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api';
import { useCallback } from 'react';
import Modal from '../../../../components/Modal/Modal';

interface NotePreviewProps {
  id: number;
}
export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const handleClose = useCallback(() => router.back(), [router]);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button onClick={handleClose} className={css.backBtn}>
              Back
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <ul className={css.noteFooter}>
            <li className={css.tag}>{note.tag}</li>
            <li className={css.date}>
              {new Date(note.createdAt).toLocaleDateString('uk-UA')}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
