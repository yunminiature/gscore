import {FC, InputHTMLAttributes} from "react";
import styled from "styled-components";
import {colors} from "../../styles/colors";
import {CheckBox} from "../../../public";

interface DefaultCheckboxProps extends InputHTMLAttributes<HTMLInputElement>{
  isChecked: boolean,
  handleChange: () => void
}

const DefaultCheckbox:FC<DefaultCheckboxProps> = ({isChecked, handleChange}) => {


  return(
    <Label isChecked={isChecked}>
      <HiddenCheckbox type="checkbox" onChange={handleChange}/>
      <StyledCheckbox isChecked={isChecked}>
        {isChecked && <CheckBox/>}
      </StyledCheckbox>
    </Label>
  )
}

const Label = styled.label<{isChecked:boolean}>`
  &:hover{
    span{
      box-shadow: 0 0 0 4px ${props => props.isChecked ? "rgba(252, 88, 66, 0.3)" : "rgba(255, 255, 255, 0.3)"};
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

const StyledCheckbox = styled.span<{isChecked:boolean}>`
  display: inline-block;
  height: 28px;
  width: 28px;
  margin: 32px 0 0;
  padding: 4px 5px;
  border: 1px solid ${props => props.isChecked ? colors.red["300"] : colors.neutral["400"]};
  border-radius: 7px;
  background-color: ${props => props.isChecked ? colors.accent.primary : colors.neutral["100"]};

  &:hover:enabled{
    background-color: ${props => props.isChecked ? colors.red["400"] : colors.neutral["400"]};
    border: 1px solid ${props => props.isChecked ? colors.red["400"] : colors.neutral["400"]};
  }

  &:disabled{
    cursor: default;
    opacity: 0.6;
  }
`

export default DefaultCheckbox