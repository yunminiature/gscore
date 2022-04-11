import {FC, useState} from "react";
import styled from 'styled-components';
import {colors} from "../../styles/colors";
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {useAppSelector, useAppDispatch} from "../../store";
import {selectUsers} from "../../store/Users/selectors";
import {addUser} from "../../store/Users/actions";
import DefaultInput from "../../ui/DefaultInput/DefaultInput";
import DefaultButton from "../../ui/DefaultButton/DefaultButton";

interface CreateAccountInputs{
  userName: string,
  email: string,
  password: string
}
type LogInInputs = Omit<CreateAccountInputs, "userName">;

const LoginForm:FC = () => {

  const users = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()

  const [formState, setFormState] = useState("createAccount")
  const editFormState = (state:"createAccount"|"logIn"|"checkout") => {
    setFormState(state)
  }

  const {
    handleSubmit: handleSubmitCreate,
    control: controlCreate,
    formState: {errors, isValid},
  } = useForm<CreateAccountInputs>({
    defaultValues: {
    userName: "",
    email: "",
    password:""
  },
    mode: "onBlur"
  })
  const onSubmitCreate: SubmitHandler<CreateAccountInputs> = data =>{
    dispatch(addUser({
      id: 0,
      userName: data.userName,
      email: data.email,
      password: data.password,
    }))
    editFormState("logIn")

  }

  const {
    handleSubmit: handleSubmitLogIn,
    control: controlLogIn
  } = useForm<LogInInputs>({defaultValues: {
      email: "",
      password:""
    }})
  const onSubmitLogIn: SubmitHandler<LogInInputs> = data =>{
    const userCheck = users.find(user => (user.email === data.email && user.password === data.password));
    (userCheck!==undefined) && editFormState("checkout")
  }


  const createAccount = (formState==="createAccount") &&
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
              valid={(value !== "") ? "valid" : (errors?.userName) ? "invalid" : "undefined"}
              invalidText={errors?.userName?.message}
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
              valid={(value !== "") ? "valid" : (errors?.email) ? "invalid" : "undefined"}
              invalidText={errors?.email?.message}
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
              type="password"
              value={value}
              valid={(value !== "") ? "valid" : (errors?.password) ? "invalid" : "undefined"}
              invalidText={errors?.password?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />
        <DefaultButton type="submit" theme="primary" value="Send password" disabled={!isValid}/>
      </form>
      <FormFooter>
        <p>Have an account?</p>
        <a onClick={() => {editFormState("logIn")}}>Go to the next step</a>
      </FormFooter>
    </>

  const logIn = (formState==="logIn") &&
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
              valid={(value !== "") ? "valid" : (errors?.email) ? "invalid" : "undefined"}
              invalidText={errors?.email?.message}
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
              type="password"
              value={value}
              valid={(value !== "") ? "valid" : (errors?.password) ? "invalid" : "undefined"}
              invalidText={errors?.password?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />
        <DefaultButton type="submit" theme="primary" value="Log in"/>
      </form>
    </>

  const checkout = (formState==="checkout") &&
    <>
      <FormHeader>
        <h1>Checkout</h1>
        <p>We have sent you a payment receipt by e-mail and a link to download the plugin with a license key.</p>
      </FormHeader>
      <Checkout>
        <CheckoutHeader>
          <h3>Package name</h3>
          <h3>Price</h3>
        </CheckoutHeader>
        <CheckoutItem>
          <p>Single site license</p>
          <p>$77</p>
        </CheckoutItem>
      </Checkout>
      <DefaultButton type="button" theme="primary" value="Purchase"/>
    </>

  return(
    <Form>
      <LoginNav>
        <LoginNavItem state={((formState==="createAccount")||(formState==="logIn")||(formState==="checkout"))}>
          <p>Create account</p>
          <hr/>
        </LoginNavItem>
        <LoginNavItem state={((formState==="logIn")||(formState==="checkout"))}>
          <p>Log in</p>
          <hr/>
        </LoginNavItem>
        <LoginNavItem state={(formState==="checkout")}>
          <p>Checkout</p>
          <hr/>
        </LoginNavItem>
      </LoginNav>
      {createAccount}
      {logIn}
      {checkout}
    </Form>

  )
}

const Form = styled.div`
  max-width: 620px;
  min-height: 930px;
  margin: 0 auto;
  padding: 25px 0 42px;

  button{
    min-width: 200px;
    margin: 25px 0 0 0;
  }

  @media (max-width: 769px) {
    min-height: 760px;
  }
`
const LoginNav = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`
const LoginNavItem = styled.li<{state:boolean}>`
  width: 32%;
  p{
    margin: 0 0 16px;
    line-height: 22px;
    font-size: 20px;
    font-weight: 600;
  }
  hr{
    border: 4px solid ${props => props.state ? colors.accent.primary : colors.neutral["700"]};
    border-radius: 4px;
  }
`
const FormHeader = styled.div`
  margin: 0 0 32px 0;
  
  h1{
    width: 100%;
    margin: 65px 0 15px 0;
    line-height: 54px;
    font-size: 44px;
    font-weight: 700;
    @media (max-width: 426px) {
      line-height: 40px;
      font-size: 28px;
    }
  }
  p{
    width: 100%;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
  }
`
const FormFooter = styled.div`
  margin: 48px 0 0 0;
  display: flex;
  line-height: 18px;
  font-size: 16px;
  font-weight: 400;
  p{
    margin: 0 10px 0 0;
  }
  a{
    color: ${colors.accent.primary};
    cursor: pointer;
  }
`

const Checkout = styled.div`
  margin: 0 0 25px;
  padding: 50px 30px;
  border-radius: 12px;
  background-color: #272727;
`
const CheckoutHeader = styled.div`
  padding: 0 0 32px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.neutral["700"]};
  h3{
    margin: 0;
    line-height: 34px;
    font-size: 24px;
    font-weight: 700;
  }
`
const CheckoutItem = styled.div`
  padding: 32px 0 0;
  display: flex;
  justify-content: space-between;
  p{
    margin: 0;
    line-height: 38px;
    font-size: 24px;
    font-weight: 400;
  }
`

export default LoginForm