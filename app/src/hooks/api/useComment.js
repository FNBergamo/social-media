import { useMemo } from 'react'
import useAxiosPrivate from './useAxiosPrivate'

export function useComment() {
  const axiosPrivate = useAxiosPrivate()

  async function create({ text, userId, postId }) {
    return await axiosPrivate.post('/comment', { text, userId, postId })
  }

  async function list({ id }) {
    return await axiosPrivate.get(`/comment/post/${id}`)
  }

  async function interact({ userId, commentId, type }) {
    return await axiosPrivate.put('/commentInteraction', { userId, commentId, type })
  }

  return useMemo(
    () => ({
      create,
      list,
      interact,
    }),
    [],
  )
}
