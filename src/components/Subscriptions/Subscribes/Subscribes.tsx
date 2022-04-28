import {FC, useState} from "react";
import styled from "styled-components";
import {SubscribeDto} from "../../../store/Subscribes/types";
import SubscribeCard from "../SubscribeCard";
import {colors} from "../../../styles/colors";
import {Arrow} from "../../../../public"
import Codes from "../Codes";
import {DefaultButton} from "../../../ui";
import {CodeDto} from "../../../store/Codes/types";

interface SubscribesProps {
  subscribes: SubscribeDto[],
  codes: CodeDto[]
}

const Subscribes:FC<SubscribesProps> = ({subscribes, codes}) => {

  const [currentCard, setCurrentCard] = useState(1)
  const [viewCard, setViewCard] = useState(0)
  const handleViewCard = (id:number) => {
    setViewCard(id)
  }

  return(
    <>
      {!subscribes?.length
        ?
        <EmptySubscriptions>
          <h3>No active subscriptions</h3>
          <p>You can subscribe right now by clicking on the button below</p>
          <DefaultButton type="button" theme="primary" value="Get Gscore"/>
        </EmptySubscriptions>
        :
        <>
          <SubscriptionsSlider position={currentCard}>
            <ul>
              {subscribes.map((subscribe: SubscribeDto, index) => {
                return <SubscribeCard key={subscribe.id} {...subscribe} isActive={(index + 1) === currentCard} handleViewCard={handleViewCard}/>
              })}
            </ul>
          </SubscriptionsSlider>
          <SubscriptionsSliderNav state={{currentCard, countCard: subscribes.length}}>
            <SubscriptionsSliderBtn onClick={() => {
              setCurrentCard(currentCard - 1)
            }} disabled={currentCard === 1}>
              <Arrow/>
            </SubscriptionsSliderBtn>
            <p><CurrentCardNumber>{currentCard}</CurrentCardNumber>/{subscribes.length}</p>
            <SubscriptionsSliderBtn onClick={() => {
              setCurrentCard(currentCard + 1)
            }} disabled={currentCard === subscribes.length}>
              <Arrow/>
            </SubscriptionsSliderBtn>
          </SubscriptionsSliderNav>
        </>}
      <Codes subscribeId={viewCard} codes={codes}/>
    </>
  )
}


const EmptySubscriptions = styled.div`
`

const SubscriptionsSlider = styled.div<{position: number}>`
  position: relative;
  
  ul{
    display: flex;
    position: absolute;
    left: ${props => props.position && `calc((1 - ${props.position})*648px)`};
  }
`
const SubscriptionsSliderNav = styled.div<{state:{currentCard: number, countCard:number}}>`
  margin-top: 400px;
  display: flex;

  p{
    margin: auto 12px;
    line-height: 28px;
    font-size: 22px;
    font-weight: 700;
    color: ${colors.neutral["600"]};
  }
  
  button{
    &:first-child{
      border: 1px solid ${props => props.state.currentCard === 1 ? colors.neutral["600"] : colors.neutral["500"]};
      svg{
        stroke: ${props => props.state.currentCard === 1 ? colors.neutral["600"] : colors.neutral["500"]};
      }
    }
    &:last-child{
      border: 1px solid ${props => props.state.currentCard === props.state.countCard ? colors.neutral["600"] : colors.neutral["500"]};
      svg{
        stroke: ${props => props.state.currentCard === props.state.countCard ? colors.neutral["600"] : colors.neutral["500"]};
      }
    }
    @media (max-width: 426px) {
      display: none;
    }
  }

  @media (max-width: 426px) {
    margin-top: 320px;
    p{
      width: 100%;
      text-align: center;
    }
  }
`
const SubscriptionsSliderBtn = styled.button`
  padding: 10px 10px 8px 10px;
  border-radius: 12px;
  background-color: ${colors.neutral["800"]};

  svg{
    stroke: ${colors.neutral["500"]};
  }

  &:last-child{
    svg{
      transform: rotate(180deg);
    }
    
  }  
`
const CurrentCardNumber = styled.span`
  color: ${colors.neutral["100"]};
`
export default Subscribes
