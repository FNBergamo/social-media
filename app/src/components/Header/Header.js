import s from "./Header.module.css"

export function Header() {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <button className={s.profileImageButton}>
          <img
            alt='profile'
            className={s.profileImage}
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwvGWjwjiCh8UCmLjeDGBj9iIZt7cyiynfwnYz_63_hg&s'
          />
        </button>
        <p>Movies</p>
        <button>Logout</button>
      </div>
    </header>
  )
}
