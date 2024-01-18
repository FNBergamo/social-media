import { Field, Form, Formik } from 'formik'
import { useAuth } from '../../hooks/useAuth'
import { usePost } from '../../hooks/api/usePost'
import s from './CreatePost.module.css'

export function CreatePost() {
  const { userInfo } = useAuth()
  const postHook = usePost()
  const initialValues = {
    text: '',
    image: '',
    userId: userInfo.userId,
    isPrivate: false,
    isHidden: false,
  }

  async function handleSubmit(values) {
    try {
      await postHook.create(values)
    } catch (error) {
      console.error('Erro ao criar o post:', error)
    }
  }

  return (
    <div className={s.createPost}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor='text'>Text</label>
            <Field type='text' id='text' name='text' />
          </div>
          <div>
            <label htmlFor='image'>Imagem</label>
            <Field type='text' id='image' name='image' />
          </div>
          <div>
            <label htmlFor='isPrivate'>Privado</label>
            <Field type='checkbox' id='isPrivate' name='isPrivate' />
          </div>
          <div>
            <label htmlFor='isHidden'>Hidden</label>
            <Field type='checkbox' id='isHidden' name='isHidden' />
          </div>
          <button type='submit'>Criar</button>
        </Form>
      </Formik>
    </div>
  )
}
