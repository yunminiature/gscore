import {FC} from "react"
import {useRouter} from "next/router";
import styled from "styled-components"
import {colors} from "../../styles/colors";
import {useAppDispatch} from "../../store";
import {addPackage} from "../../store/User/actions";
import Image from "next/image";
import DefaultButton from "../../ui/DefaultButton";

interface PriceCardProps{
  id: number
  title: string,
  description: string,
  price: number,
  properties: string[]
}

const PriceCard:FC<PriceCardProps> = ({id, title, description, price, properties}) =>{

  const dispatch = useAppDispatch()
  const router = useRouter();
  const handleClick = () => {
    dispatch(addPackage(id))
    router.push (
      { pathname: '/start',
        query: {
          data: JSON.stringify(id)
        }
      }
    )
  }

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
                <Image src="/СheckIcon.svg" width="25px" height="25px" alt="facebook"/>
                <p>{property}</p>
              </CardProperty>)
          })
        }
      </CardProperties>
      <DefaultButton type="button" theme="secondary" onClick={handleClick} value="Get Gscore"/>
    </Card>
  )
}

const Card = styled.li`
  width: 32%;
  min-width: 290px;
  padding: 40px 50px;
  border-radius: 12px;
  background-color: #272727;

  hr{
    margin: 40px 0;
  }

  &:nth-child(2){
    background-color: ${colors.accent.primary};
    hr{
      border-top: 1px solid ${colors.neutral["100"]};
    }
    button{
      color: ${colors.accent.primary};
    }
  }
  
  &:nth-child(2n+1){
    margin-top: 50px;
    hr{
      border-top: 1px solid ${colors.neutral["500"]};
    }
    p{
      color: ${colors.neutral["400"]};
    }
    button{
      color: #181818;
    }
  }
  
  button{
    width: 100%;
    margin: 20px 0 0 0;
  }

  @media (max-width: 1080px) {
    width: 80%;
    margin: 0 auto 40px;

    &:nth-child(2n+1) {
      margin-top: 0;
    }
  }
  @media (max-width: 426px) {
    width: 100%;
    margin: 0 0 15px;
  }
`
const CardPrice = styled.h3`
  width: 100%;
  margin: 0 0 10px 0;
  text-align: center;
  line-height: 66px;
  font-size: 54px;
  font-family: DMSans;
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

export default PriceCard