import { ListItemIcon, MenuItem, Select } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import s from './PostHeader.module.css'
import { usePost } from '../../../hooks/api/usePost'
import { useState } from 'react'

export function PostHeader({ post }) {
  const { id, user } = post
  const postHook = usePost()
  const [isPrivate, setIsPrivate] = useState(post.isPrivate)

  async function update(value) {
    try {
      await postHook.update({ postId: id, isPrivate: value, isHidden: false })
      setIsPrivate(value)
    } catch (error) {
      console.error('Error ao alterar o status do post:', error)
    }
  }

  return (
    <div className={s.postHeader}>
      <div className={s.userInfo}>
        <img src={user.profilePicture} alt='' loading='lazy' className={s.profilePicture} />
        <div className={s.userDescription}>
          <p>{user.name}</p>
          <p>@{user.username}</p>
        </div>
      </div>
      <Select
        className={s.select}
        id='isPrivate'
        value={isPrivate}
        onChange={(e) => update(Boolean(e.target.value))}
      >
        <MenuItem value={false}>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem value={true}>
          <ListItemIcon>
            <LockOutlinedIcon />
          </ListItemIcon>
        </MenuItem>
      </Select>
    </div>
  )
}
