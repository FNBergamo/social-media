import { Field, Form, Formik } from 'formik'
import s from './PostComments.module.css'
import { useEffect, useState } from 'react'
import { useComment } from '../../../hooks/api/useComment'
import { useAuth } from '../../../hooks/useAuth'

import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import cn from 'classnames'
import { INTERACTION_TYPE } from '../../../constants/InteractionType'

export function PostComments({ post }) {
  const { id } = post
  const { userInfo } = useAuth()
  const [comments, setComments] = useState([])
  const [isInteracting, setIsInteracting] = useState(false)
  const [userInteraction, setUserInteraction] = useState(post.userInteraction)
  const [likes, setLikes] = useState(post.likes)
  const commentHook = useComment()
  const initialValues = {
    text: '',
  }

  useEffect(() => {
    async function getComments() {
      try {
        const response = await commentHook.list({ id })
        setComments(response?.data)
      } catch (e) {
        console.log(e)
      }
    }

    getComments()
  }, [commentHook, id])

  async function handleSubmit(values, { resetForm }) {
    try {
      const { data } = await commentHook.create({
        text: values.text,
        userId: userInfo.userId,
        postId: id,
      })

      setComments([...comments, data])
      resetForm()
    } catch (e) {
      console.log(e)
    }
  }

  async function interact(commentId, interactionType) {
    setIsInteracting(true)
    try {
      const { data } = await commentHook.interact({
        userId: userInfo.userId,
        commentId,
        type: interactionType,
      })
      setLikes(data.likes)
      setUserInteraction(data.interaction)
    } catch (error) {
      console.error('Error ao interagir no comentário:', error)
    }
    setIsInteracting(false)
  }

  return (
    <div className={s.postComments}>
      {comments.map((c) => (
        <div key={c.id}>
          {c.userInteraction ? console.log(c) : ''}
          <p>{c.text}</p>
          <div className={s.interactions}>
            <button
              className={cn(s.button, {
                [s.upvote]: c.userInteraction === INTERACTION_TYPE.UPVOTE,
              })}
              disabled={isInteracting}
              onClick={() => interact(c.id, INTERACTION_TYPE.UPVOTE)}
            >
              <ThumbUpIcon />
            </button>
            {c.likes}
            <button
              className={cn(s.button, {
                [s.downvote]: c.userInteraction === INTERACTION_TYPE.DOWNVOTE,
              })}
              disabled={isInteracting}
              onClick={() => interact(c.id, INTERACTION_TYPE.UPVOTE)}
            >
              <ThumbDownIcon />
            </button>
          </div>
        </div>
      ))}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field type='text' id='text' name='text' />
          <button type='submit'>Postar</button>
        </Form>
      </Formik>
    </div>
  )
}
