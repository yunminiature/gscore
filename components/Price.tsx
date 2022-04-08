import {FC} from "react"
import styled from "styled-components"
import Link from "next/link";
import PriceCard from "./PriceCard";

const Price:FC = () => {
  const priceCards:{
    title: string,
    description: string,
    price: number,
    properties: string[]
  }[] = [
    {
      title: "Single site license",
      description: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
      price: 77,
      properties: ["Single site license", "Special introductory pricing", "Unlimited Pages and Keywords", "Billed annually"]
    },
    {
      title: "3 Site license",
      description: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
      price: 117,
      properties: ["All features for 3 sites", "Special introductory pricing", "Unlimited Pages and Keywords", "Billed annually"]
    },
    {
      title: "10 Site license",
      description: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
      price: 167,
      properties: ["All features for 10 sites", "Special introductory pricing", "Unlimited Pages and Keywords", "Billed annually"]
    }
  ]
  return(

    <>
      <PriceSection>
        <PriceTitle>
          Get started with Gscore today!
        </PriceTitle>

        <PriceList>
          {
            priceCards.map((priceCard:{
              title: string,
              description: string,
              price: number,
              properties: string[]
            }) => {
              return <PriceCard key={priceCard.price} {...priceCard}/>
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
    </>
  )
}

const PriceSection = styled.header`
  padding: 0 80px;
`
const PriceTitle = styled.h1`
  width: 100%;
  margin: 0 0 50px 0;
  text-align: center;
  line-height: 54px;
  font-size: 44px;
  font-weight: 700;
`
const PriceList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0;
`
const PriceDescription = styled.p`
  width: 100%;
  margin: 40px 0;
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
  
  a{
    border-bottom: 1px solid #fc5842;
    color: #fc5842;
  }
`

export default Price
