import { useState } from 'react'
import { usePost } from '../../../hooks/api/usePost'
import { INTERACTION_TYPE } from '../../../constants/InteractionType'
import { useAuth } from '../../../hooks/useAuth'

import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import cn from 'classnames'

import s from './PostInteractions.module.css'

export function PostInteractions({ post }) {
  const { id } = post
  const { userInfo } = useAuth()
  const [isInteracting, setIsInteracting] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [userInteraction, setUserInteraction] = useState(post.userInteraction)
  const postHook = usePost()

  async function interact(interactionType) {
    setIsInteracting(true)
    try {
      const { data } = await postHook.interact({
        userId: userInfo.userId,
        postId: id,
        type: interactionType,
      })
      setLikes(data.likes)
      setUserInteraction(data.interaction)
    } catch (error) {
      console.error('Error ao interagir no post:', error)
    }
    setIsInteracting(false)
  }

  return (
    <div className={s.postInteractions}>
      <p>{likes}</p>
      <div className={s.interactions}>
        <button
          className={cn(s.button, {
            [s.upvote]: userInteraction === INTERACTION_TYPE.UPVOTE,
          })}
          disabled={isInteracting}
          onClick={() => interact(INTERACTION_TYPE.UPVOTE)}
        >
          <ThumbUpIcon />
        </button>
        <button
          className={cn(s.button, { [s.downvote]: userInteraction === INTERACTION_TYPE.DOWNVOTE })}
          disabled={isInteracting}
          onClick={() => interact(INTERACTION_TYPE.DOWNVOTE)}
        >
          <ThumbDownIcon />
        </button>
      </div>
    </div>
  )
}
