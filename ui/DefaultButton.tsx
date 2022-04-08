import {FC} from "react"
import styled from 'styled-components';

interface DefaultButtonProps{
  type: "button" | "submit" | "reset";
  theme: string;
  onClick?: () => void;
  value?: string;
}

const DefaultButton:FC<DefaultButtonProps> = ({type, theme, onClick, value}) => {

  console.log(theme)

  const styleTheme = () => {
    switch (theme){
      case "primary":
        return {
          color: "#fff",
          background: "#fc5842",
          hover: "#dc2b2b",
          hovertext:"#fff",
          focus: "4px solid rgba(0, 0, 0, .5)",
          disabled: "0.6"
        };
      case "secondary":
        return {
          color: "#fc5842",
          background: "#fff",
          hover: "#fff",
          hovertext:"#dc2b2b",
          focus: "4px solid rgba(0, 0, 0, .4)",
          disabled: "0.6"
        }
    }
  }

  console.log(styleTheme())

  return(
    <Button type={type} theme={styleTheme()} onClick={onClick}>{value}</Button>
  )
}

const Button = styled.button`
  padding: 22px 17px;
  border: 4px solid ${props => props.theme.background};
  border-radius: 4px;
  line-height: 18px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.background};

  &:hover{
    border: 4px solid ${props => props.theme.hover};
    color: ${props => props.theme.hovertext};
    background-color: ${props => props.theme.hover};
    cursor: pointer;
  }
  &:focus{
    padding: 22px 17px;
    border: ${props => props.theme.focus};
  }
  &disabled{
    opacity: ${props => props.theme.disabled};
  }
  
`

export default DefaultButton