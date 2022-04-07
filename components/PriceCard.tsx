import {FC} from "react"
import styled from "styled-components"
import Image from "next/image";

interface PriceCardProps{
  title: string,
  description: string,
  price: number,
  properties: string[]
}

const PriceCard:FC<PriceCardProps> = ({title, description, price, properties}) =>{
  return(
    <Card>
      <CardPrice>${price}</CardPrice>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <hr/>
      <CardProperties>
        {
          properties.map((property: string) => {
            return (
              <CardProperty key={property}>
                <Image src="/CheckCircle.svg" width="25px" height="25px" alt="facebook"/>
                <p>{property}</p>
              </CardProperty>)
          })
        }
      </CardProperties>
      <CardButton>Get Gscore</CardButton>
    </Card>
  )
}

const Card = styled.li`
  width: 32%;
  padding: 40px;
  border-radius: 12px;
  background-color: #272727;

  hr{
    margin: 40px 0;
  }

  &:nth-child(2){
    background-color: #fc5842;
    hr{
      border-top: 1px solid #fff;
    }
    CardDescription{
      color: #fff;
    }
  }
  
  &:nth-child(2n+1){
    margin-top: 50px;
    hr{
      border-top: 1px solid #969696;
    }
    CardDescription{
      color: #c7c7c7;
    }
  }
`
const CardPrice = styled.p`
  width: 100%;
  margin: 0 0 10px 0;
  text-align: center;
  line-height: 66px;
  font-size: 54px;
  font-weight: 700;
`
const CardTitle = styled.h2`
  width: 100%;
  margin: 0 0 10px 0;
  text-align: center;
  line-height: 26px;
  font-size: 24px;
  font-weight: 700;
`
const CardDescription = styled.p`
  width: 100%;
  margin: 0;
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
`
const CardProperties = styled.ul`

`
const CardProperty = styled.li`
  margin: 0 0 15px 0;
  display: flex;
  
  p{
    margin: 0 0 0 15px;
    line-height: 20px;
    font-size: 18px;
    font-weight: 500;
  }
`
const CardButton = styled.button`
  width: 100%;
  padding: 25px;
  text-align: center;
  line-height: 20px;
  font-size: 18px;
  font-weight: 700;
  border: 0;
  border-radius: 6px;
  background-color: #fff;
  color: #181818;
`
export default PriceCard