import {FC, useEffect} from "react";
import {useCookies} from "react-cookie"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {DefaultForm} from "../../../ui";
import {DefaultInput} from "../../../ui";
import {DefaultButton} from "../../../ui";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {signInAction} from "../../../store/User/reducer";
import {EMAIL_REGEX, PASSWORD_REGEX} from "../../../constants";
import {useAppDispatch, useAppSelector} from "../../../store";
import {FormStageTypes} from "../../../pages/start";
import {selectUser} from "../../../store/User/selectors";

interface LogInProps{
  onStageChange:(stage:FormStageTypes) => void
}

interface LogIn{
  username: string,
  email: string,
  password: string
}

const LogIn:FC<LogInProps> = ({onStageChange}) => {

  const dispatch = useAppDispatch()
  const {
    token,
    status,
    error
  } = useAppSelector(selectUser)

  const [cookie, setCookie] = useCookies(["user"])

  useEffect(() => {
    status==="resolved" && onStageChange(FormStageTypes.CHECKOUT)
  }, [status])

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
    dispatch(signInAction({
      email,
      password
    }))
      .then(() => {
        setCookie("user", JSON.stringify(token), {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        })
      })
      .catch(() => {
        reset()
      })
  }

  return (
      <DefaultForm headerTitle="Log in">
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
          <ErrorMessage>{error}</ErrorMessage>
          <DefaultButton type="submit" theme="primary" value="Log in" disabled={!isValid} isLoading={status==="pending"}/>
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

export default LogIn