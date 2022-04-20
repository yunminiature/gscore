import {FC, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {EMAIL_REGEX, USER_REGEX} from "../../../constants";
import DefaultInput from "../../../ui/DefaultInput";
import DefaultButton from "../../../ui/DefaultButton";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {updateData} from "../../../pages/api/User";
import {useAppDispatch} from "../../../store";
import {updateDataAction} from "../../../store/User/actions";

interface UpdatePersonal{
  username: string;
  email: string;
}

const PersonalForm:FC = () => {

  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const {handleSubmit, control, reset, formState: {errors, isValid}} = useForm<UpdatePersonal>(
    {
      defaultValues: {
        username: "",
        email: ""
      },
      mode: "onChange"
    }
  )
  const onSubmit: SubmitHandler<UpdatePersonal> = data =>{
    const {username, email} = data;
    setLoading(true)
    updateData({
      email,
      username
    })
      .then((response) => {
        dispatch(updateDataAction(response.data))
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
      <FormTitle>Personal Info</FormTitle>
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
  @media (max-width: 426px) {
    line-height: 28px;
    font-size: 24px;
  }
`
const ErrorMessage = styled.p`
  margin: 0 0 15px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.red["300"]};
`

export default PersonalForm