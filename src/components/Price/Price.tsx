import {FC} from "react"
import styled from "styled-components"
import {colors} from "../../styles/colors";
import Link from "next/link";
import PriceCard from "../PriceCard/PriceCard";
import {Product, Products} from "../../store/Products/types";

const Price:FC<Products> = ({isLoading, products}) => {

  return(
    <>
      {!isLoading &&
        <PriceSection>
          <PriceTitle>
            Get started with Gscore today!
          </PriceTitle>

          <PriceList>
            {
              products.map((product:Product) => {
                return <PriceCard key={product.id} {...product}/>
              })
            }
          </PriceList>

          <PriceDescription>
            Have more than 10 sites?
            <br/>
            <Link href="/">
              <a>Contact us</a>
            </Link>
          </PriceDescription>
        </PriceSection>
      }
    </>
  )
}

const PriceSection = styled.section`
  width: 100%;
  padding: 20px 0 42px;
`
const PriceTitle = styled.h1`
  width: 100%;
  margin: 0 0 50px 0;
  text-align: center;
  line-height: 54px;
  font-size: 44px;
  font-weight: 700;
  @media (max-width: 426px) {
    margin: 0 0 32px 0;
    line-height: 40px;
    font-size: 28px;
  }
`
const PriceList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0;
`
const PriceDescription = styled.p`
  width: 100%;
  margin: 40px 0 0;
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
  
  a{
    border-bottom: 1px solid ${colors.accent.primary};
    color: ${colors.accent.primary};
  }
`
export default Price
