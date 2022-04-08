import {FC} from "react";
import styled from 'styled-components';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import Link from "next/link";
import DefaultInput from "../ui/DefaultInput";
import DefaultButton from "../ui/DefaultButton";


interface CreateAccountInputs{
  userName: string,
  email: string,
  password: string
}
interface LogInInputs{
  email: string,
  password: string
}

const LoginForm:FC = () => {

  const {
    handleSubmit: handleSubmitCreate,
    control: controlCreate
  } = useForm<CreateAccountInputs>({defaultValues: {
    userName: "",
    email: "",
    password:""
  }})
  const onSubmitCreate: SubmitHandler<CreateAccountInputs> = data =>{

  }

  const {
    handleSubmit: handleSubmitLogIn,
    control: controlLogIn
  } = useForm<LogInInputs>({defaultValues: {
      email: "",
      password:""
    }})
  const onSubmitLogIn: SubmitHandler<LogInInputs> = data =>{

  }


  //const state = "createAccount"
  //const state = "logIn"

  const createAccount = (state==="createAccount") &&
    <>
      <FormHeader>
        <h1>Create account</h1>
        <p>You need to enter your name and email. We will send you a temporary password by email</p>
      </FormHeader>

      <form onSubmit={handleSubmitCreate(onSubmitCreate)}>
        <Controller
          control={controlCreate}
          name="userName"
          rules={{
            required:"Обязательное поле"
          }}
          render={({field:{onChange, value}}) => (
            <DefaultInput
              label="Username"
              placeholder="Username"
              type="text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          control={controlCreate}
          name="email"
          rules={{
            required:"Обязательное поле"
          }}
          render={({field:{onChange, value}}) => (
            <DefaultInput
              label="Email"
              placeholder="Email"
              type="text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          control={controlCreate}
          name="password"
          rules={{
            required:"Обязательное поле"
          }}
          render={({field:{onChange, value}}) => (
            <DefaultInput
              label="Password"
              placeholder="Password"
              type="text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />
        <DefaultButton type="submit" theme="primary" value="Send Password"/>
      </form>
      <FormFooter>
        <p>Have an account?</p>
        <Link href="/">
          <a>Go to the next step</a>
        </Link>
      </FormFooter>
    </>

  const logIn = (state==="logIn") &&
    <>
      <FormHeader>
        <h1>Log in</h1>
      </FormHeader>

      <form onSubmit={handleSubmitLogIn(onSubmitLogIn)}>
        <Controller
          control={controlLogIn}
          name="email"
          rules={{
            required:"Обязательное поле"
          }}
          render={({field:{onChange, value}}) => (
            <DefaultInput
              label="Email"
              placeholder="Email"
              type="text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          control={controlLogIn}
          name="password"
          rules={{
            required:"Обязательное поле"
          }}
          render={({field:{onChange, value}}) => (
            <DefaultInput
              label="Password"
              placeholder="Password"
              type="text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />
        <DefaultButton type="submit" theme="primary" value="Log in"/>
      </form>
    </>

  return(
    <Form>
      {createAccount}
      {logIn}
    </Form>

  )
}

const Form = styled.div`
  width: 40%;
  margin: 0 auto;

  button{
    width: 35%;
    margin: 25px 0 0 0;
  }
`
const FormHeader = styled.div`
  margin: 0 0 32px 0;
  
  h1{
    width: 100%;
    margin: 0 0 15px 0;
    line-height: 54px;
    font-size: 44px;
    font-weight: 700;
  }
  p{
    width: 100%;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
  }
`
const FormFooter = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  line-height: 18px;
  font-size: 16px;
  font-weight: 400;
  p{
    margin: 0 10px 0 0;
  }
  a{
    color: #fc5842;
  }
`

export default LoginForm