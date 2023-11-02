import { Field, Form, Formik } from "formik"
import { ApiService } from "../services/ApiService"
import { useNavigate } from "react-router-dom"

import s from "./Register.module.css"
import { REGISTER_ENDPOINT } from "../constants/Endpoints"

export function Register() {
  const navigate = useNavigate()
  const initialValues = {
    name: "",
    username: "",
    birthDate: "",
    profilePicture: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  async function handleSubmit(values, { setSubmitting }) {
    try {
      const result = await ApiService.post(REGISTER_ENDPOINT, {
        name: values.name,
        email: values.email,
        password: values.password,
        username: values.username,
        profilePicture: values.profilePicture,
        birthDate: values.birthDate,
      })

      if (result.status === 201) {
        navigate("/")
      }
    } catch (e) {
      alert("alguma coisa deu errado")
    }
    setSubmitting(false)
  }

  return (
    <div className={s.register}>
      <p>Cadastro</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
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
              <Field
                type='password'
                id='confirmPassword'
                name='confirmPassword'
              />
            </div>

            <button type='submit' disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
