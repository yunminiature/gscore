import {FC} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {EMAIL_REGEX, USER_REGEX} from "../../../constants";
import DefaultInput from "../../../ui/DefaultInput";
import DefaultButton from "../../../ui/DefaultButton";
import styled from "styled-components";

interface UpdatePersonal{
  username: string;
  email: string;
}

const PersonalForm:FC = () => {

  const {handleSubmit, control, formState: {errors, isValid}} = useForm<UpdatePersonal>(
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
    //я тут еще не доделала
    // signUp({
    //   username,
    //   email,
    //   password
    // })
    //   .then(() => {
    //     onStageChange("LOG_IN")
    //   })
    //   .catch((error) => {
    //     (error.response.status === 409)
    //     {
    //       setErrorMessage(error.message)
    //       reset()
    //     }
    //   })
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
        <DefaultButton type="submit" theme="primary" disabled={!isValid} value="Save"/>
      </form>
    </Form>
  )
}

const Form = styled.div`
  max-width: 512px;
`
const FormTitle = styled.h2`
`

export default PersonalForm