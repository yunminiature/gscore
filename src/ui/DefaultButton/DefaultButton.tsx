import {ButtonHTMLAttributes, FC} from "react"
import styled from 'styled-components';
import {colors} from "../../styles/colors";

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  theme: string;
}

const DefaultButton:FC<DefaultButtonProps> = ({type, theme, onClick, disabled, value}) => {

  const styleTheme = () => {
    switch (theme){
      case "primary":
        return {
          color: colors.neutral["100"],
          background: colors.accent.primary,
          hover: colors.red["400"],
          hovertext: colors.neutral["100"],
          focus: "4px solid rgba(0, 0, 0, .5)",
          disabled: "0.6"
        };
      case "secondary":
        return {
          color: colors.accent.primary,
          background: colors.neutral["100"],
          hover: colors.neutral["100"],
          hovertext: colors.red["400"],
          focus: "4px solid rgba(0, 0, 0, .4)",
          disabled: "0.6"
        }
    }
  }

  return(
    <Button type={type} theme={styleTheme()} onClick={onClick} disabled={disabled}>{value}</Button>
  )
}

const Button = styled.button`
  padding: 17px;
  border: 4px solid ${props => props.theme.background};
  border-radius: 4px;
  line-height: 18px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.background};

  &:active:hover{
    border: 4px solid ${props => props.theme.hover};
    color: ${props => props.theme.hovertext};
    background-color: ${props => props.theme.hover};
    cursor: pointer;
  }
  &:focus{
    padding: 22px 17px;
    border: ${props => props.theme.focus};
  }
  &:disabled{
    cursor: default;
    opacity: ${props => props.theme.disabled};
  }
`

export default DefaultButton