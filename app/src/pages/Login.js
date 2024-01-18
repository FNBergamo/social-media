import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'

import { useAuth } from '../hooks/useAuth'
import { useUser } from '../hooks/api/useUser'

import s from './Login.module.css'

export function Login() {
  const { login, isLogged } = useAuth()
  const navigate = useNavigate()
  const userHook = useUser()

  useEffect(() => {
    if (isLogged) {
      navigate('/')
    }
  }, [navigate, isLogged])

  const initialValues = {
    email: '',
    password: '',
  }

  async function handleSubmit(values) {
    const { email, password } = values
    try {
      const { data } = await userHook.login({ email, password })
      const { accessToken, refreshToken, userId } = data
      login({ accessToken, refreshToken, userId })
      navigate('/')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  return (
    <div className={s.login}>
      <p>Login</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor='email'>Email</label>
            <Field type='text' id='email' name='email' />
          </div>

          <div>
            <label htmlFor='password'>Senha</label>
            <Field type='password' id='password' name='password' />
          </div>

          <button type='submit'>Login</button>
        </Form>
      </Formik>
    </div>
  )
}
