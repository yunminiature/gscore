import {FC} from "react";
import styled from "styled-components";
import {colors} from "../../styles/colors";

interface DefaultFormProps{
  headerTitle?: string,
  headerDescription?: string,
  footerText?: string,
  footerLink?: string,
  footerLinkOnClick?: (event:React.MouseEvent) => void
}

const DefaultForm:FC<DefaultFormProps> = ({headerTitle, headerDescription, footerText, footerLink, footerLinkOnClick, children}) => {
  return(
    <>
      <FormHeader>
        <h1>{headerTitle}</h1>
        <p>{headerDescription}</p>
      </FormHeader>
      {children}
      <FormFooter>
        <p>{footerText}</p>
        <a onClick={footerLinkOnClick}>{footerLink}</a>
      </FormFooter>
    </>
  )
}

const FormHeader = styled.div`
  margin: 0 0 32px 0;
  
  h1{
    width: 100%;
    margin: 65px 0 15px 0;
    line-height: 54px;
    font-size: 44px;
    font-weight: 700;
    @media (max-width: 426px) {
      line-height: 40px;
      font-size: 28px;
    }
  }
  p{
    width: 100%;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
  }
`
const FormFooter = styled.div`
  margin: 48px 0 0 0;
  display: flex;
  line-height: 18px;
  font-size: 16px;
  font-weight: 400;
  p{
    margin: 0 10px 0 0;
  }
  a{
    color: ${colors.accent.primary};
    cursor: pointer;
  }
`

export default DefaultForm
