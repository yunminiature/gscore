import {FC} from "react"
import {useRouter} from "next/router";
import styled from "styled-components"
import {colors} from "../../styles/colors";
import {useAppDispatch} from "../../store";
import {addPackage} from "../../store/User/actions";
import {СheckIcon} from "../../../public"
import {DefaultButton} from "../../ui";
import {Product} from "../../store/Products/types";
const PriceCard:FC<Product> = ({id, sitesCount, name, prices}) =>{

  const dispatch = useAppDispatch()
  const router = useRouter();
  const handleClick = () => {
    dispatch(addPackage(id))
    router.push ("/start")
  }

  return(
    <Card>
      <CardPrice>${prices.find(item => item.isActive)?.price}</CardPrice>
      <CardTitle>{name} license</CardTitle>
      <CardDescription>Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price</CardDescription>
      <hr/>
      <CardProperties>
        <CardProperty>
          <СheckIcon width="26px" height="26px"/>
          <p>All features for {sitesCount} sites</p>
        </CardProperty>
        <CardProperty>
          <СheckIcon width="26px" height="26px"/>
          <p>Special introductory pricing</p>
        </CardProperty>
        <CardProperty>
          <СheckIcon width="26px" height="26px"/>
          <p>Unlimited Pages and Keywords</p>
        </CardProperty>
        <CardProperty>
          <СheckIcon width="26px" height="26px"/>
          <p>Billed annually</p>
        </CardProperty>
      </CardProperties>
      <DefaultButton type="button" theme="secondary" onClick={handleClick} value="Get Gscore"/>
    </Card>
  )
}

export const Card = styled.li`
  width: 32%;
  min-width: 290px;
  padding: 40px 50px;
  border-radius: 12px;
  background-color: ${colors.neutral["700"]};
  margin-top: 50px;
  transition: 0.3s;
  
  hr{
    margin: 40px 0;
    border-top: 1px solid ${colors.neutral["500"]};
  }
  p{
    color: ${colors.neutral["400"]};
  }
  button{
    color: ${colors.neutral["800"]};
  }

  &:hover{
    margin: 0 !important;
    background-color: ${colors.accent.primary} !important;
    hr{
      border-top: 1px solid ${colors.neutral["100"]} !important;
    }
    p{
      color: ${colors.neutral["100"]} !important;
    }
    transition: 0.3s;
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
  margin: 0 0 7px 0;
  display: flex;
  
  p{
    margin: 5px 0 10px 15px;
    line-height: 20px;
    font-size: 18px;
    font-weight: 500;
  }
`

export default PriceCard