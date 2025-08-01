import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import { getServerMe } from '../../../lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile Page | NoteHub',
  description: 'Profile page of NoteHub site',
  openGraph: {
    title: 'Profile Page | NoteHub',
    description: 'Profile page of NoteHub site',
    url: `https://08-zustand-rho.vercel.app/404`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Profile page',
      },
    ],
    type: 'website',
  },
};

export default async function ProfilePage() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            loading="lazy"
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
