import {FC} from "react"
import styled from 'styled-components'
import Link from "next/link";
import Logo from "../../../public/Logo.svg"
import Facebook from "../../../public/Facebook.svg"
import Twitter from "../../../public/Twitter.svg"
import LinkedIn from "../../../public/LinkedIn.svg"

const Footer:FC = () => {

  return(
    <LayoutFooter>
      <FooterColumn>
        <Logo width="170px" height="42px" alt="gscore"/>
        <FooterDescription>Ut enim аd minim veniam quis nostrud exercitation еа commodo</FooterDescription>
      </FooterColumn>
      <hr/>
      <FooterBottom>
        <FooterCopyright>
          Copyright 2022 GScore | Аll Rights Reserved |&nbsp;
          <Link href="/">
            <a>Cookies</a>
          </Link> |&nbsp;
          <Link href="/">
            <a>Privacy Policy</a>
          </Link>
        </FooterCopyright>

        <FooterSocial>
          <li><Facebook width="14px" height="25px" alt="facebook"/></li>
          <li><Twitter width="25px" height="21px" alt="twitter"/></li>
          <li><LinkedIn width="25px" height="24px" alt="linkedin"/></li>
        </FooterSocial>
      </FooterBottom>
    </LayoutFooter>
  )
}

const LayoutFooter = styled.footer`
`
const FooterColumn = styled.div`
  max-width: 320px;
  padding: 60px 0;
  @media (max-width: 426px) {
    padding: 40px 0;
  }
`
const FooterDescription = styled.p`
  margin: 20px 0 0;
  line-height: 30px;
  font-size: 18px;
  font-family: Inter;
  font-weight: 500;
  @media (max-width: 426px) {
    font-weight: 400;
  }
`
const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  padding: 40px 0;
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
  @media (max-width: 426px) {
    justify-content: center;
    font-weight: 400;
  }
`
const FooterCopyright = styled.div`
  text-align: center;
  font-family: Inter;
  a{
    border-bottom: 1px solid #fff;
  }
`
const FooterSocial = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 0;
  
  li{
    margin: 0 30px 0 0;
    &:last-child {
      margin: 0;
    }
  }

  @media (max-width: 426px) {
    margin: 25px 0 0 0;
  }
`

export default Footer
