import {FC, useEffect} from "react";
import {DefaultButton} from "../../../ui";
import {SubscribeDto, SubscribeStatus} from "../../../store/Subscribes/types";
import {useAppDispatch, useAppSelector} from "../../../store";
import {selectProducts} from "../../../store/Products/selectors";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {fetchProducts} from "../../../store/Products/reducer";

interface SubscribeCardProps extends SubscribeDto{
  isActive: boolean;
  handleViewCard: (id:number) => void;
  onTouchStart: (event:React.TouchEvent) => void,
  onTouchMove: (event:React.TouchEvent) => void
}

const SubscribeCard:FC<SubscribeCardProps> = ({id, productId, currentPeriodEnd, status, isActive, handleViewCard, onTouchStart, onTouchMove}) => {

  const dispatch = useAppDispatch()
  useEffect(() => {
      dispatch(fetchProducts())
  },[dispatch])
  const {products} = useAppSelector(selectProducts)

  const subscribeName = products?.find(product => (product.id === productId))?.name
  const subscribePrice = products?.find(product => (product.id === productId))?.prices.find(product => product.isActive)?.price

  const date = new Date(+currentPeriodEnd * 1000)

  const mq = window.matchMedia('(max-width: 321px)')

  return(
    <Subscribe state={isActive} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <SubscribeHeader state={status}>
        <h3>Gscore</h3>
        <p>{status}</p>
      </SubscribeHeader>

      <hr/>

      <SubscribeBody>
        <SubscribeDescriptions>
          <p>{subscribeName} license</p>
          <p>${subscribePrice}</p>
        </SubscribeDescriptions>

        <SubscribeDate>valid until {date.toLocaleString().split(",")[0]}</SubscribeDate>

        <DefaultButton type="button" theme={mq.matches ? "primary" : "secondary"} value="View" onClick={() => handleViewCard(id)}/>
      </SubscribeBody>
    </Subscribe>
  )
}

const Subscribe = styled.div<{state:boolean}>`
  margin: 0 28px 0 0;
  padding: 15px 0;
  width: 620px;
  background-color: ${colors.neutral["600"]};
  border-radius: 12px;
  opacity: ${props => props.state ? 1 : 0.6};
  
  hr{
    border-top: 1px solid ${colors.neutral["500"]};
  }
  
  button{
    min-width: 120px;
  }

  @media (max-width: 426px) {
    margin: 0 12px 0 0;
    width: 320px;
  }
  @media (max-width: 321px) {
    margin: 0 12px 0 0;
    width: 260px;
  }
`
const SubscribeHeader = styled.div<{state:SubscribeStatus}>`
  padding: 32px;
  display: flex;
  justify-content: space-between;
  
  h3, p{
    margin: 0;
    line-height: 28px;
    font-size: 22px;
    font-weight: 700;
  }
  p{
    color: ${props => props.state === SubscribeStatus.ACTIVE ? colors.green["300"] : colors.red["300"]}
  }

  @media (max-width: 426px) {
    padding: 16px;
    h3, p{
      line-height: 22px;
      font-size: 20px;
      font-weight: 600;
    }
  }

  @media (max-width: 321px) {
    h3, p{
      line-height: 20px;
      font-size: 18px;
      font-weight: 600;
    }
  }
`
const SubscribeBody = styled.div`
  padding: 32px;
  @media (max-width: 426px) {
    padding: 16px;
  }
`
const SubscribeDescriptions = styled.div`
  display: flex;
  justify-content: space-between;

  p{
    margin: 0;
    line-height: 26px;
    font-size: 24px;
    font-weight: 500;
  }

  @media (max-width: 426px) {
    p{
      line-height: 24px;
      font-size: 18px;
      font-weight: 500;
    }
  }
`
const SubscribeDate = styled.p`
  margin: 12px 0 32px;
  line-height: 18px;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.neutral["500"]};
`

export default SubscribeCard