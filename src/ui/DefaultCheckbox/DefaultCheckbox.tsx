import {FC, InputHTMLAttributes} from "react";
import styled from "styled-components";
import {colors} from "../../styles/colors";
import {CheckBox} from "../../../public";

interface DefaultCheckboxProps extends InputHTMLAttributes<HTMLInputElement>{
  isChecked: boolean,
  handleChange: () => void
}

const DefaultCheckbox:FC<DefaultCheckboxProps> = ({isChecked, handleChange, disabled}) => {


  return(
    <Label isChecked={isChecked} isDisabled={disabled}>
      <HiddenCheckbox type="checkbox" onChange={handleChange} disabled={disabled}/>
      <StyledCheckbox isChecked={isChecked} isDisabled={disabled}>
        {isChecked && <CheckBox/>}
      </StyledCheckbox>
    </Label>
  )
}

const Label = styled.label<{isChecked:boolean, isDisabled: boolean|undefined}>`
  &:hover{
    span{
      box-shadow: ${props => !props.isDisabled && `0 0 0 4px ${props.isChecked ? "rgba(252, 88, 66, 0.3)" : "rgba(255, 255, 255, 0.3)"}`};
    }
  }
`

const HiddenCheckbox = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.span<{isChecked:boolean, isDisabled: boolean|undefined}>`
  display: inline-block;
  height: 28px;
  width: 28px;
  margin: 32px 0 0;
  padding: 4px 5px;
  border: 1px solid ${props => props.isChecked ? colors.red["300"] : colors.neutral["400"]};
  border-radius: 7px;
  background-color: ${props => props.isChecked ? colors.accent.primary : colors.neutral["100"]};

  cursor: ${props => props.isDisabled ? "default" : "pointer" };
  opacity: ${props => props.isDisabled ? "0.6" : "1" };
  

  &:hover{
    background-color: ${props => props.isChecked ? colors.red["400"] : colors.neutral["400"]};
    border: 1px solid ${props => props.isChecked ? colors.red["400"] : colors.neutral["400"]};
  }  
`

export default DefaultCheckbox