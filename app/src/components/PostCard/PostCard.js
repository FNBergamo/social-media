import { useState } from 'react'
import cn from 'classnames'

import { PostHeader } from '../Post/PostHeader/PostHeader'
import { PostBody } from '../Post/PostBody/PostBody'
import { PostInteractions } from '../Post/PostInteractions/PostInteractions'
import { PostComments } from '../Post/PostComments/PostComments'

import s from './PostCard.module.css'
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

export function PostCard({ post }) {
  const [isHidden, setIsHidden] = useState(post.isHidden)

  return (
    <div className={cn(s.postCard, { [s.postCardHidden]: isHidden })}>
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostInteractions post={post} />
      <PostComments post={post} />
    </div>
  )
}
