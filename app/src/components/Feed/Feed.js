import { useEffect, useState } from 'react'
import { usePost } from '../../hooks/api/usePost'
import { PostCard } from '../PostCard/PostCard'

import s from './Feed.module.css'

export function Feed() {
  const [posts, setPosts] = useState([])
  const postHook = usePost()

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await postHook.list()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    getPosts()
  }, [])

  return (
    <div className={s.feed}>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
