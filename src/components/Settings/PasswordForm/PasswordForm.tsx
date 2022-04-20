import {FC, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {PASSWORD_REGEX} from "../../../constants";
import DefaultInput from "../../../ui/DefaultInput";
import DefaultButton from "../../../ui/DefaultButton";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {updatePassword} from "../../../pages/api/User";

interface UpdatePassword{
  currentPassword: string,
  newPassword: string
}

const PasswordForm:FC = () => {

  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const {handleSubmit, control, reset, formState: {errors, isValid}} = useForm<UpdatePassword>(
    {
      defaultValues: {
        currentPassword: "",
        newPassword: ""
      },
      mode: "onChange"
    }
  )
  const onSubmit: SubmitHandler<UpdatePassword> = data =>{
    const {currentPassword, newPassword} = data;
    setLoading(true)
    updatePassword({
      currentPassword,
      newPassword
    })
      .then(() => {
        setErrorMessage("")
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message)
      })
      .finally(() => {
        reset()
        setLoading(false)
      })
  }

  return(
    <Form>
      <FormTitle>Change password</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="currentPassword"
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
              label="Current password"
              placeholder="Current password"
              type="password"
              value={value}
              valid={(!errors?.currentPassword && value!== "") ? "valid" : value!== "" ? "invalid" : "undefined"}
              invalidText={errors?.currentPassword?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
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
              label="New password"
              placeholder="New password"
              type="password"
              value={value}
              valid={(!errors?.newPassword && value!== "") ? "valid" : value!== "" ? "invalid" : "undefined"}
              invalidText={errors?.newPassword?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
            />
          )}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <DefaultButton type="submit" theme="primary" disabled={!isValid} value="Save" isLoading={isLoading}/>
      </form>
    </Form>
  )
}

const Form = styled.div`
  max-width: 512px;
  margin: 45px 0 0;

  button{
    margin-top: 15px;
    min-width: 160px;
  }
`
const FormTitle = styled.h2`
  margin: 0 0 25px;
  line-height: 40px;
  font-size: 28px;
  font-weight: 700;
`
const ErrorMessage = styled.p`
  margin: 0 0 15px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.red["300"]};
`

export default PasswordForm