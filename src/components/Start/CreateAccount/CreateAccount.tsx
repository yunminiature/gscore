import {FC, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {USER_REGEX, EMAIL_REGEX, PASSWORD_REGEX} from "../../../constants";
import DefaultInput from "../../../ui/DefaultInput";
import DefaultButton from "../../../ui/DefaultButton";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {signUp} from "../../../services/Users";

interface CreateAccountProps{
  onStageChange:(stage:"CREATE_ACCOUNT"|"LOG_IN"|"CHECKOUT") => void
}

interface CreateAccount{
  username: string,
  email: string,
  password: string
}

const CreateAccount:FC<CreateAccountProps> = ({onStageChange}) => {

  const [errorMessage, setErrorMessage] = useState("")

  const {handleSubmit, control, reset, formState: {errors, isValid}} = useForm<CreateAccount>(
    {
      defaultValues: {
        username: "",
        email: "",
        password:""
      },
      mode: "onChange"
    }
  )
  const onSubmit: SubmitHandler<CreateAccount> = data =>{
    const {username, email, password} = data;
    signUp({
      username,
      email,
      password
    })
      .then(() => {
        onStageChange("LOG_IN")
      })
      .catch((error) => {
        (error.response.status === 409)
        {
          setErrorMessage("User already exists")
          reset()
        }
      })
  }

  const handleStage = (event: React.MouseEvent) => {
    onStageChange("LOG_IN")
  }

  return(
    <>
      <FormHeader>
        <h1>Create account</h1>
        <p>You need to enter your name and email. We will send you a temporary password by email</p>
      </FormHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="username"
          rules={{
            pattern: {
              value: USER_REGEX,
              message:"The field length is 3-16 characters"
            },
            required:"This field is required"
          }}
          render={({field:{onChange, value}}) => (
            <DefaultInput
              label="Username"
              placeholder="Username"
              type="text"
              value={value}
              valid={(!errors?.username && value!== "") ? "valid" : value!== "" ? "invalid" : "undefined"}
              invalidText={errors?.username?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            pattern: {
              value: EMAIL_REGEX,
              message:"Invalid email address"
            },
            required:"This field is required"
          }}
          render={({field:{onChange, value}}) => (
            <DefaultInput
              label="Email"
              placeholder="Email"
              type="email"
              value={value}
              valid={(!errors?.email && value!== "") ? "valid" : value!== "" ? "invalid" : "undefined"}
              invalidText={errors?.email?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            pattern: {
              value: PASSWORD_REGEX,
              message:"Password must be at least 8 characters, " +
                      "contain at least оnе uppercase letter, at least one number, " +
                      "and at least оnе of the following symbols: !@#$%"
            },
            required:"This field is required"
          }}
          render={({field:{onChange, value}}) => (
            <DefaultInput
              label="Password"
              placeholder="Password"
              type="password"
              value={value}
              valid={(!errors?.password && value!== "") ? "valid" : value!== "" ? "invalid" : "undefined"}
              invalidText={errors?.password?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <DefaultButton type="submit" theme="primary" disabled={!isValid} value="Send password"/>
      </form>
      <FormFooter>
        <p>Have an account?</p>
        <a onClick={handleStage}>Go to the next step</a>
      </FormFooter>
    </>
  )
}

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
const ErrorMessage = styled.p`
  margin: 0 0 15px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.red["300"]};
`
export default CreateAccount