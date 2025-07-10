import css from './NotesSidebar.module.css';
import { NOTE_TAGS } from '../../../../../types/note';
import Link from 'next/link';

export default async function NotesSidebar() {
  return (
    <>
      <Link href="/notes/action/create" className={css.createBtn}>
        Create note
      </Link>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {NOTE_TAGS.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
