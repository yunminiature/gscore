import {FC, useState} from "react";
import {useCookies} from "react-cookie"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import DefaultInput from "../../../ui/DefaultInput";
import DefaultButton from "../../../ui/DefaultButton";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {signIn} from "../../../services/Users";
import {signInAction} from "../../../store/User/actions";
import {EMAIL_REGEX, PASSWORD_REGEX} from "../../../constants";
import {useAppDispatch} from "../../../store";

interface LogInProps{
  onStageChange:(stage:"CREATE_ACCOUNT"|"LOG_IN"|"CHECKOUT") => void
}

interface LogIn{
  username: string,
  email: string,
  password: string
}

const LogIn:FC<LogInProps> = ({onStageChange}) => {

  const dispatch = useAppDispatch()

  const [cookie, setCookie] = useCookies(["user"])
  const [errorMessage, setErrorMessage] = useState("")

  const {handleSubmit, control, reset, formState: {errors, isValid}} = useForm<LogIn>(
    {
      defaultValues: {
        email: "",
        password:""
      },
      mode: "onChange"
    }
  )
  const onSubmit: SubmitHandler<LogIn> = data => {
    const {email, password} = data;
    signIn({
      email,
      password
    })
      .then((response) => {
        dispatch(signInAction(response.data))
        setCookie("user", JSON.stringify(response.data.token), {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        })
        onStageChange("CHECKOUT")
      })
      .catch((error) => {
        (error.response.status === 404)
        {
          setErrorMessage("User does not exist")
          reset()
        }
      })
  }

  return (
    <>
      <FormHeader>
        <h1>Log in</h1>
      </FormHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
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
        <DefaultButton type="submit" theme="primary" value="Log in"/>
      </form>
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
const ErrorMessage = styled.p`
  margin: 0 0 15px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.red["300"]};
`

export default LogIn