import {FC} from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout:FC = ({children}) => {
  return(
    <LayoutStyle>
      <Container>
        <Header/>
        {children}
      </Container>
      <hr/>
      <Container>
        <Footer/>
      </Container>
    </LayoutStyle>


  )
}

const LayoutStyle = styled.div`
  overflow: hidden;
`

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 90px;
  @media (max-width: 426px) {
    padding: 0 15px;
  }
`

export default Layout;