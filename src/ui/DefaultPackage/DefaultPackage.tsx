import {FC} from "react";
import Image from "next/image";
import styled from "styled-components";
import {colors} from "../../styles/colors";

interface DefaultPackage{
  headerTitle?: string,
  headerDescription?: string,
  packageName?: string,
  price?: string
}

const DefaultPackage:FC<DefaultPackage> = ({headerTitle, headerDescription, packageName, price, children}) => {
  return(
    <>
      <CheckoutHeader>
        <h1>{headerTitle}</h1>
        <p>{headerDescription}</p>
      </CheckoutHeader>
      <CheckoutBody>
        <CheckoutTitle>
          <h3>Package name</h3>
          <h3>Price</h3>
        </CheckoutTitle>
        <CheckoutItem>
          <p>{packageName}</p>
          <p>$ {price} <Image src="/Basket.svg" width="20px" height="20px" alt="bascet"/></p>
        </CheckoutItem>
      </CheckoutBody>
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

export default DefaultPackage