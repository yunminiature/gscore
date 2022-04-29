import {FC} from "react";
import {DefaultButton} from "../../../ui";
import styled from "styled-components";
import DefaultPackage from "../../../ui/DefaultPackage";
import {FormStageTypes} from "../../../pages/start";
import {buySubscribe} from "../../../pages/api/Payments";
import {Product} from "../../../store/Products/types";
import {useAppSelector} from "../../../store";
import {selectPackage} from "../../../store/User/selectors";

interface CheckoutProps{
  onStageChange:(stage:FormStageTypes) => void,
  products: Product[]
}

const Checkout:FC<CheckoutProps> = ({onStageChange, products}) => {

  const userPackage = useAppSelector(selectPackage)

  const productName = products.find(product => (product.id === userPackage))?.name
  const productPrice = products.find(product => (product.id === userPackage))?.prices.find(product => product.isActive)?.price

  const handleStage = () => {
    buySubscribe({priceId: userPackage})
      .then(() => {
        onStageChange(FormStageTypes.START)
      })
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
      <DefaultButton type="button" theme="primary" value="Purchase" onClick={handleStage} isLoading={status === "pending"}/>
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