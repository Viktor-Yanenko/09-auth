'use client';

import { NOTE_TAGS } from '../../types/note';
import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              onClick={toggle}
              href={`/notes/filter/all`}
              className={css.menuLink}
            >
              All notes
            </Link>
          </li>
          {NOTE_TAGS.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
