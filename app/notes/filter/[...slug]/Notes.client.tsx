'use client';

import { useState } from 'react';
import { fetchNotes } from '../../../../lib/api';
import NoteList from '../../../../components/NoteList/NoteList';
import Pagination from '../../../../components/Pagination/Pagination';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import css from './NotesPage.module.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import Modal from '../../../../components/Modal/Modal';
import { useDebounce } from 'use-debounce';
import { Note } from '../../../../types/note';
import Link from 'next/link';
// import NoteForm from '../../../../components/NoteForm/NoteForm';

interface NotesClientProps {
  initialNotes: Note[];
  initialTotalPages: number;
  tag?: string;
}

export default function NotesClient({
  initialNotes,
  initialTotalPages,
  tag,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  // const [modal, setModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage, tag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, tag),
    placeholderData: keepPreviousData,
    initialData:
      debouncedQuery === '' && currentPage === 1
        ? {
            notes: initialNotes,
            totalPages: initialTotalPages,
          }
        : undefined,
  });

  const totalPages = data?.totalPages ?? 0;

  // const openModal = () => setModal(true);
  // const closeModal = () => setModal(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onSearch={value => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
        />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        {/* <button className={css.button} onClick={openModal}>
          Create note +
        </button> */}
        <Link href="/notes/action/create" className={css.button}>
          Create Note
        </Link>
      </header>
      {data?.notes ? (
        <NoteList notes={data?.notes} />
      ) : (
        !isLoading && !isError && <p className={css.empty}>No notes found</p>
      )}
      {/* {modal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )} */}
    </div>
  );
}
