import { useMemo } from 'react'
// import { useHttp } from '../../services/ApiService'
import useAxiosPrivate from './useAxiosPrivate'

export function usePost() {
  // const http = useHttp()
  const axiosPrivate = useAxiosPrivate()

  async function create({ text, image, userId, isPrivate, isHidden }) {
    return await axiosPrivate.post('/post', { text, image, userId, isPrivate, isHidden })
  }

  async function list() {
    return await axiosPrivate.get('/post')
  }

  async function userPosts({ id }) {
    return await axiosPrivate.get(`/post/${id}`)
  }

  async function interact({ userId, postId, type }) {
    return await axiosPrivate.put('/postInteraction', { userId, postId, type })
  }

  async function update({ postId, isPrivate, isHidden }) {
    return await axiosPrivate.put(`/post/${postId}`, { isPrivate: isPrivate, isHidden })
  }

  return useMemo(
    () => ({
      create,
      list,
      userPosts,
      interact,
      update,
    }),
    [],
  )
}
