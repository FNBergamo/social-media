import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useExtraData } from '../../hooks/useExtraData'
import s from './Header.module.css'

export function Header() {
  const { logout } = useAuth()
  const { userDetails } = useExtraData()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavLink className={s.profileImageButton} to={'/profile'}>
          <img
            alt='profile'
            className={s.profileImage}
            src={userDetails.profilePicture}
            // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwvGWjwjiCh8UCmLjeDGBj9iIZt7cyiynfwnYz_63_hg&s'
          />
        </NavLink>
        <p>{userDetails.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  )
}
