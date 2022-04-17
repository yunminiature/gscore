import {FC, useState} from "react";
import styled from "styled-components";
import {colors} from "../../styles/colors";
import CreateAccount from "../../components/Start/CreateAccount";
import LogIn from "../../components/Start/LogIn";
import Checkout from "../../components/Start/Checkout";

interface StartProps {
  packageId: number;
}

const Start:FC<StartProps> = ({packageId}) => {

  //пока не понимаю как сделать через enum и map

  // enum FormStages {
  //   CREATE_ACCOUNT= "CREATE_ACCOUNT",
  //   LOG_IN = "LOG_IN",
  //   CHECKOUT = "CHECKOUT",
  //   START = "START"
  // }
  // (Object.keys(FormStages) as Array<keyof typeof FormStages>).map((key) => {
  //   return()
  // })

  const [formStage, setFormStage] = useState("CREATE_ACCOUNT")
  const handleFormStage = (stage:"CREATE_ACCOUNT"|"LOG_IN"|"CHECKOUT") => {
    setFormStage(stage)
  }

  const form = () => {
    switch(formStage){
      case "CREATE_ACCOUNT":
        return <CreateAccount onStageChange={handleFormStage}/>
      case "LOG_IN":
        return <LogIn onStageChange={handleFormStage}/>
      case "CHECKOUT":
        return <Checkout onStageChange={handleFormStage} packageId={packageId}/>
    }
  }

  return(
    <StartSection>
      <StartNavBar>
        <StartNavItem state={((formStage==="CREATE_ACCOUNT")||(formStage==="LOG_IN")||(formStage==="CHECKOUT"))}>
          <p>Create account</p>
          <hr/>
        </StartNavItem>
        <StartNavItem state={((formStage==="LOG_IN")||(formStage==="CHECKOUT"))}>
          <p>Log in</p>
          <hr/>
        </StartNavItem>
        <StartNavItem state={(formStage==="CHECKOUT")}>
          <p>Checkout</p>
          <hr/>
        </StartNavItem>
      </StartNavBar>

      {form()}
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

export default Start