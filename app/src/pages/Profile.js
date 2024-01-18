import { useEffect, useState } from 'react'
import { useExtraData } from '../hooks/useExtraData'
import s from './Profile.module.css'
import { usePost } from '../hooks/api/usePost'
import { PostCard } from '../components/PostCard/PostCard'

export function Profile() {
  const { userDetails } = useExtraData()
  const [posts, setPosts] = useState([])
  const postHook = usePost()

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await postHook.userPosts(userDetails.id)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    getPosts()
  }, [])

  return (
    <div className={s.profile}>
      <img
        alt='profile'
        className={s.profileImage}
        src={userDetails.profilePicture}
        // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwvGWjwjiCh8UCmLjeDGBj9iIZt7cyiynfwnYz_63_hg&s'
      />

      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <p>NOME: {userDetails.nome}</p>
      <p>DATA NASCIMENTO: {userDetails.birthDate}</p>
      <p>EMAIL: {userDetails.email}</p>
      <p>USERNAME: @{userDetails.username}</p>
    </div>
  )
}
