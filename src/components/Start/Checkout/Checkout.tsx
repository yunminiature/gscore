import {FC} from "react";
import Image from "next/image";
import DefaultButton from "../../../ui/DefaultButton";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {useAppSelector} from "../../../store";
import {selectPrice} from "../../../store/Price/selectors";
import {selectUser} from "../../../store/User/selectors";

interface CheckoutProps{
  onStageChange:(stage:"CREATE_ACCOUNT"|"LOG_IN"|"CHECKOUT") => void
}

const Checkout:FC<CheckoutProps> = ({onStageChange}) => {

  const price = useAppSelector(selectPrice)
  const user = useAppSelector(selectUser)

  const handleStage = (event: React.MouseEvent) => {
    //onStageChange("")
  }

  return (
    <>
      <CheckoutHeader>
        <h1>Checkout</h1>
      </CheckoutHeader>
      <CheckoutBody>
        <CheckoutTitle>
          <h3>Package name</h3>
          <h3>Price</h3>
        </CheckoutTitle>
        <CheckoutItem>
          <p>{price.find(item => (item.id === user.package))?.title}</p>
          <p>$ {price.find(item => (item.id === user.package))?.price} <Image src="/Basket.svg" width="20px" height="20px" alt="bascet"/></p>
        </CheckoutItem>
      </CheckoutBody>
      <TotalPrice>
        <h3>Total</h3>
        <p>$ {price.find(item => (item.id === user.package))?.price}</p>
      </TotalPrice>
      <DefaultButton type="button" theme="primary" value="Purchase" onClick={handleStage}/>
    </>
  )
}

const CheckoutHeader = styled.div`
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

const CheckoutBody = styled.div`
  margin: 0 0 25px;
  padding: 48px 30px;
  border-radius: 12px;
  background-color: #272727;
`
const CheckoutTitle = styled.div`
  padding: 0 0 32px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.neutral["700"]};
  h3{
    min-width: 100px;
    margin: 0;
    line-height: 34px;
    font-size: 24px;
    font-weight: 700;
  }
`
const CheckoutItem = styled.div`
  padding: 30px 0 0;
  display: flex;
  justify-content: space-between;
  p{
    min-width: 100px;
    margin: 0;
    line-height: 38px;
    font-size: 24px;
    font-weight: 400;
  }
`
const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0 20px;
  
  h3{
    margin: 0;
    line-height: 40px;
    font-size: 28px;
    font-weight: 700;
  }

  p{
    margin: 0;
    line-height: 40px;
    font-size: 28px;
    font-weight: 700;
  }
`

export default Checkout