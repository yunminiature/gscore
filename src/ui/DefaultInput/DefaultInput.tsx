import {FC, InputHTMLAttributes} from "react"
import styled from 'styled-components';
import {colors} from "../../styles/colors";
import check from "../../../public/Check.svg";
import close from "../../../public/Close.svg"

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  valid: "undefined"|"valid"|"invalid";
  invalidText?: string;
}

const DefaultInput:FC<DefaultInputProps> = ({label, type, placeholder, value, valid, invalidText, onChange}) => {

  const validTheme = () => {
    switch (valid){
      case "undefined":
        return{
          color: colors.neutral["300"]
        }
      case "valid":
        return{
          color: colors.green["300"],
          icon: check.src,
        }
      case "invalid":
        return{
          color: colors.red["300"],
          icon: close.src,
        }

    }
  }

  return(
    <Label>
      <LabelText>{label}</LabelText>
      <Input type={type} placeholder={placeholder} value={value} theme={validTheme()} onChange={onChange}/>
      {
        (invalidText) &&
        <InvalidMessage>
          {invalidText}
        </InvalidMessage>
      }
    </Label>
  )
}

const Label = styled.label`

`

const Input = styled.input`
  width: 100%;
  margin: 0 0 20px 0;
  padding: 25px 45px 25px 25px;
  border: 1px solid ${props => props.theme.color};
  border-radius: 6px;
  line-height: 18px;
  font-size: 16px;
  font-weight: 400;
  caret-color: ${colors.accent.primary};
  color: ${colors.neutral["700"]};
  background-image: url(${props => props.theme.icon});
  background-repeat: no-repeat;
  background-position: top 25px right 25px;

  &:focus{
    outline: none;
  }

  &:disabled{
    background-color: ${colors.neutral["300"]};
  }
  
  &::placeholder{
    color: ${colors.neutral["500"]};
  }
`

const LabelText = styled.p`
  display: none;
`
const InvalidMessage = styled.p`
  margin: 0 0 15px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.red["300"]};
`

export default DefaultInput;
