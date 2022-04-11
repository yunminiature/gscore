import {FC} from "react"
import styled from "styled-components"
import Image from "next/image";

const Header:FC = () => {
  return(
    <HeaderLayout>
      <Image src="/Logo.svg" width="170px" height="42px" alt="gscore"/>
    </HeaderLayout>
  )
}

const HeaderLayout = styled.div`
  width: 100%;
  padding: 32px 0;
  @media (max-width: 426px) {
    padding: 25px 0 32px;
    //Image{
    //  width: 130px;
    //  height: 32px;
    //}
  }
`

export default Header
