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
  padding: 40px 80px;
`

export default Header
