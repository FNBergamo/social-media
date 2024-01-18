import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { usePost } from '../hooks/api/usePost'

import s from './Register.module.css'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export function Register() {
  const navigate = useNavigate()
  const postHook = usePost()
  const { login, isLogged } = useAuth()

  useEffect(() => {
    if (isLogged) {
      navigate('/')
    }
  }, [navigate, isLogged])

  const initialValues = {
    name: '',
    username: '',
    birthDate: '',
    profilePicture: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  async function handleSubmit(values) {
    try {
      const { data } = await postHook.create({
        name: values.name,
        email: values.email,
        password: values.password,
        username: values.username,
        profilePicture: values.profilePicture,
        birthDate: values.birthDate,
      })
      const { accessToken, refreshToken, userId } = data
      login({ accessToken, refreshToken, userId })
      navigate('/')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  return (
    <div className={s.register}>
      <p>Cadastro</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor='name'>Nome</label>
            <Field type='text' id='name' name='name' />
          </div>

          <div>
            <label htmlFor='username'>Apelido</label>
            <Field type='text' id='username' name='username' />
          </div>

          <div>
            <label htmlFor='birthDate'>Data de Nascimento</label>
            <Field type='date' id='birthDate' name='birthDate' />
          </div>

          <div>
            <label htmlFor='profilePicture'>Foto de Perfil</label>
            <Field type='text' id='profilePicture' name='profilePicture' />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <Field type='email' id='email' name='email' />
          </div>

          <div>
            <label htmlFor='password'>Senha</label>
            <Field type='password' id='password' name='password' />
          </div>

          <div>
            <label htmlFor='confirmPassword'>Confirme sua senha</label>
            <Field type='password' id='confirmPassword' name='confirmPassword' />
          </div>

          <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  )
}
