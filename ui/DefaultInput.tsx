import {FC} from "react"
import styled from 'styled-components';

interface DefaultInputProps{
  label?: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DefaultInput:FC<DefaultInputProps> = ({label, type, placeholder, value, onChange}) => {

  return(
    <Label>
      <LabelText>{label}</LabelText>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    </Label>
  )
}

const Label = styled.label`

`

const Input = styled.input`
  width: 100%;
  margin: 0 0 25px 0;
  padding: 25px;
  border: 1px solid #d7d7d7;
  border-radius: 6px;
  line-height: 18px;
  font-size: 16px;
  font-weight: 400;
  caret-color: #fc5842;
  color: #393939;

  &:focus{
    outline: none;
  }

  &:disabled{
    background-color: #d7d7d7;
  }
  
  &::placeholder{
    color: #969696;
  }
`

const LabelText = styled.h3`
  display: none;
`

export default DefaultInput;
