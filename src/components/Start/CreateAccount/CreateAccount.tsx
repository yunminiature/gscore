import {FC, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {USER_REGEX, EMAIL_REGEX, PASSWORD_REGEX} from "../../../constants";
import {DefaultForm} from "../../../ui";
import {DefaultInput} from "../../../ui";
import {DefaultButton} from "../../../ui";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {signUp} from "../../../pages/api/User";
import {FormStageTypes} from "../../../pages/start";

interface CreateAccountProps{
  onStageChange:(stage:FormStageTypes) => void
}

interface CreateAccount{
  username: string,
  email: string,
  password: string
}

const CreateAccount:FC<CreateAccountProps> = ({onStageChange}) => {

  const [isLoading, setLoading] = useState(false)

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
    setLoading(true)
    signUp({
      username,
      email,
      password
    })
      .then(() => {
        onStageChange(FormStageTypes.LOG_IN)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        reset()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleStage = () => {
    onStageChange(FormStageTypes.LOG_IN)
  }

  return(
      <DefaultForm
        headerTitle="Create account"
        headerDescription="You need to enter your name and email. We will send you a temporary password by email"
        footerText="Have an account?"
        footerLink="Go to the next step"
        footerLinkOnClick={handleStage}
      >
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
          <DefaultButton type="submit" theme="primary" disabled={!isValid} value="Send password" isLoading={isLoading}/>
        </form>
      </DefaultForm>
  )
}


const ErrorMessage = styled.p`
  margin: 0 0 15px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.red["300"]};
`
export default CreateAccount