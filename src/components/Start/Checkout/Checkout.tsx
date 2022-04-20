import {FC} from "react";
import DefaultButton from "../../../ui/DefaultButton";
import styled from "styled-components";
import {useAppSelector} from "../../../store";
import {selectProducts} from "../../../store/Products/selectors";
import {selectUser} from "../../../store/User/selectors";
import DefaultPackage from "../../../ui/DefaultPackage";

interface CheckoutProps{
  onStageChange:(stage:"CREATE_ACCOUNT"|"LOG_IN"|"CHECKOUT"|"START") => void
}

const Checkout:FC<CheckoutProps> = ({onStageChange}) => {

  const products = useAppSelector(selectProducts)
  const user = useAppSelector(selectUser)
  const productName = products.find(item => (item.id === user.package))?.name
  const productPrice = products.find(item => (item.id === user.package))?.prices.find(item => item.isActive)?.price

  const handleStage = () => {
    onStageChange("START")
  }

  return (
    <>
      <DefaultPackage
        headerTitle="Checkout"
        packageName={productName}
        price={productPrice}
      />
      <TotalPrice>
        <h3>Total</h3>
        <p>$ {productPrice}</p>
      </TotalPrice>
      <DefaultButton type="button" theme="primary" value="Purchase" onClick={handleStage}/>
    </>
  )
}

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