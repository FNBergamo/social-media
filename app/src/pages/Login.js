import { Field, Form, Formik } from "formik"
import s from "./Login.module.css"

export function Login() {
  const initialValues = {
    email: "",
    password: "",
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 400)
  }

  return (
    <div className={s.login}>
      <p>Login</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor='email'>Email</label>
              <Field type='email' id='email' name='email' />
            </div>

            <div>
              <label htmlFor='password'>Senha</label>
              <Field type='password' id='password' name='password' />
            </div>

            <button type='submit' disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
