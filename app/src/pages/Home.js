import { Header } from '../components/Header/Header'
import { CreatePost } from '../components/CreatePost/CreatePost'
import { Feed } from '../components/Feed/Feed'

import s from './Home.module.css'

export function Home() {
  return (
    <div className={s.home}>
      <Header />
      <CreatePost />
      <Feed />
    </div>
  )
}
