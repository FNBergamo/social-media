import s from './PostBody.module.css'

export function PostBody({ post }) {
  const { text, image } = post

  return (
    <>
      <p className={s.postText}>{text}</p>
      <img src={image} alt='' loading='lazy' className={s.postImage} />
    </>
  )
}
