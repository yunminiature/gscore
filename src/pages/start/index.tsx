import {FC, useState} from "react";
import styled from "styled-components";
import {colors} from "../../styles/colors";
import CreateAccount from "../../components/Start/CreateAccount";
import LogIn from "../../components/Start/LogIn";
import Checkout from "../../components/Start/Checkout";
import Start from "../../components/Start/Start";
import store, {useAppSelector} from "../../store";
import {Product} from "../../store/Products/types";
import {fetchProducts} from "../../store/Products/reducer";
import {selectToken, selectUser} from "../../store/User/selectors";
import {unwrapResult} from "@reduxjs/toolkit";

export const enum FormStageTypes {
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  LOG_IN = "LOG_IN",
  CHECKOUT = "CHECKOUT",
  START = "START"
}

export const getServerSideProps = async () => {
  const data = await store.dispatch(fetchProducts()).then(unwrapResult)
  return {
    props: {
      data
    }
  }
}

const StartPage:FC<{data: Product[]}> = ({data}) => {

  const token = useAppSelector(selectToken)

  const initialFormStage = token ? FormStageTypes.CHECKOUT : FormStageTypes.CREATE_ACCOUNT
  const [formStage, setFormStage] = useState(initialFormStage)
  const handleFormStage = (stage:FormStageTypes) => {
    setFormStage(stage)
  }

  const formStageMapping = {
    CREATE_ACCOUNT: <CreateAccount onStageChange={handleFormStage}/>,
    LOG_IN: <LogIn onStageChange={handleFormStage}/>,
    CHECKOUT: <Checkout onStageChange={handleFormStage} products={data}/>,
    START: <Start products={data}/>
  }

  return(
    <StartSection>
      {
        (formStage === FormStageTypes.START)
        ?
          <Start products={data}/>
        :
          <>
            <StartNavBar>
              <StartNavItem state={((formStage===FormStageTypes.CREATE_ACCOUNT)||(formStage===FormStageTypes.LOG_IN)||(formStage===FormStageTypes.CHECKOUT))}>
                <p>Create account</p>
                <hr/>
              </StartNavItem>
              <StartNavItem state={((formStage===FormStageTypes.LOG_IN)||(formStage===FormStageTypes.CHECKOUT))}>
                <p>Log in</p>
                <hr/>
              </StartNavItem>
              <StartNavItem state={(formStage===FormStageTypes.CHECKOUT)}>
                <p>Checkout</p>
                <hr/>
              </StartNavItem>
            </StartNavBar>
            {formStageMapping[formStage]}
          </>
      }
    </StartSection>
  )
}

const StartSection = styled.div`
  max-width: 620px;
  min-height: 930px;
  margin: 0 auto;
  padding: 25px 0 42px;

  button{
    min-width: 200px;
    margin: 25px 0 0 0;
  }

  @media (max-width: 769px) {
    min-height: 760px;
  }
`
const StartNavBar = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`
const StartNavItem = styled.li<{state:boolean}>`
  width: 32%;
  p{
    margin: 0 0 16px;
    line-height: 22px;
    font-size: 20px;
    font-weight: 600;
  }
  hr{
    border: 4px solid ${props => props.state ? colors.accent.primary : colors.neutral["700"]};
    border-radius: 4px;
  }
`

export default StartPage