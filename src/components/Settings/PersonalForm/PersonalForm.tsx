import {FC} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {EMAIL_REGEX, USER_REGEX} from "../../../constants";
import {DefaultInput} from "../../../ui";
import {DefaultButton} from "../../../ui";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {updateDataAsyncAction} from "../../../store/User/reducer";
import {useAppDispatch} from "../../../store";
import {User} from "../../../store/User/types";

interface UpdatePersonal{
  username: string;
  email: string;
}

const PersonalForm:FC<User> = ({updateDataLoading, error}) => {

  const dispatch = useAppDispatch()

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
    dispatch(updateDataAsyncAction({
      email,
      username
    }))
      .finally(() => {
        reset()
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
        <ErrorMessage>{error}</ErrorMessage>
        <DefaultButton type="submit" theme="primary" disabled={!isValid} value="Save" isLoading={updateDataLoading}/>
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