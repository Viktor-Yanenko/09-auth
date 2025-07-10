'use client';

import { useRouter } from 'next/navigation';
import { NewNoteData, NOTE_TAGS, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { useNoteDraftStore } from '../../lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const fieldId = useId();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleCancel = () => router.push('/notes/filter/all');

  const handleSubmit = (formData: FormData) => {
    const noteData: NewNoteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };
    mutate(noteData);
  };

  return (
    <>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label className={css.label} htmlFor={`${fieldId}-title`}>
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={draft?.title}
            onChange={handleChange}
            id={`${fieldId}-title`}
            className={css.input}
          />
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor={`${fieldId}-content`}>
            Content
          </label>
          <textarea
            name="content"
            id={`${fieldId}-content`}
            defaultValue={draft?.content}
            onChange={handleChange}
            className={css.textarea}
          ></textarea>
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor={`${fieldId}-tag`}>
            Tag
          </label>
          <select
            name="tag"
            id={`${fieldId}-tag`}
            defaultValue={draft?.tag}
            onChange={handleChange}
            className={css.select}
          >
            {NOTE_TAGS.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            {isPending ? 'Creating new note...' : 'Create note'}
          </button>
        </div>
      </form>
    </>
  );
}
