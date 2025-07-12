'use client';

// import Image from 'next/image';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {/* <Image
          src="picsum.photos"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        /> */}

        <form className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="usernam">Username:</label>
            <input type="text" id="username" className={css.input} />
          </div>

          <p>Email: user_email@example.com</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
