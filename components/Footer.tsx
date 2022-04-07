import {FC} from "react"
import styled from 'styled-components'
import Image from "next/image";
import Link from "next/link";

const Footer:FC = () => {

  return(
    <LayoutFooter>
      <FooterColumn>
        <Image src="/Logo.svg" width="170px" height="42px" alt="gscore"/>
        <FooterDescription>Ut enim аd minim veniam quis nostrud exercitation еа commodo</FooterDescription>
      </FooterColumn>
      <hr/>
      <FooterBottom>
        <FooterCopyright>
          Copyright 2022 GScore | Аll Rights Reserved |
          <Link href="/">
            <a>Cookies</a>
          </Link> |
          <Link href="/">
            <a>Privacy Policy</a>
          </Link>
        </FooterCopyright>

        <FooterSocial>
          <li><Image src="/Facebook.svg" width="14px" height="25px" alt="facebook"/></li>
          <li><Image src="/Twitter.svg" width="25px" height="21px" alt="twitter"/></li>
          <li><Image src="/LinkedIn.svg" width="25px" height="24px" alt="linkedin"/></li>
        </FooterSocial>
      </FooterBottom>
    </LayoutFooter>
  )
}

const LayoutFooter = styled.footer`
  hr{
    margin: 0 80px;
  }
`
const FooterColumn = styled.div`
  padding: 60px 80px;
  width: 30%;
`
const FooterDescription = styled.p`
  margin: 20px 0 0;
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
`
const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px 80px;
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
`
const FooterCopyright = styled.div`
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
`

export default Footer
