'use client';

import css from './AuthNavigation.module.css';
import Link from 'next/link';
import { useAuthStore } from '../../lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logout } from '../../lib/api/clientApi';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuth, user } = useAuthStore();
  const clearIsAuth = useAuthStore(state => state.clearIsAuth);

  const handleLogout = async () => {
    await logout();
    clearIsAuth();
    router.push('/sign-in');
  };

  return isAuth ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}
