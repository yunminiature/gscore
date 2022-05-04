import {FC, useEffect, useState} from "react";
import styled from "styled-components";
import {SubscribeDto} from "../../../store/Subscribes/types";
import SubscribeCard from "../SubscribeCard";
import {colors} from "../../../styles/colors";
import {Arrow, CloseIcon} from "../../../../public"
import Codes from "../Codes";
import {DefaultButton} from "../../../ui";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../store";
import {addCurrentSubscribe} from "../../../store/User/actions";
import {fetchSubscribes} from "../../../store/Subscribes/thunks";
import {unwrapResult} from "@reduxjs/toolkit";

const Subscribes:FC = () => {

  const dispatch = useAppDispatch()
  const [subscribes, setSubscribes] = useState<SubscribeDto[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSubscribes())
        .then(unwrapResult)
        .then ((result) => {
          setSubscribes(result);
          setLoading(false);
        })
  },[])

  const [currentCard, setCurrentCard] = useState(1)
  const [viewCard, setViewCard] = useState(0)
  const handleViewCard = (id:number) => {
    setViewCard(id)
  }

  const router = useRouter();
  const handleClick = () => {
    dispatch(addCurrentSubscribe(viewCard))
    router.push("/subscriptions/change-subscription")
  }


  const [touchPosition, setTouchPosition] = useState<number|null>()
  const handleTouchStart = (event:React.TouchEvent) => {
    const touchDown = event.touches[0].clientX
    setTouchPosition(touchDown)
  }
  const handleTouchMove = (event:React.TouchEvent) => {
    if (touchPosition !== null && touchPosition !== undefined) {
      const currentTouch = event.touches[0].clientX;
      const diff = touchPosition - currentTouch;

      (diff > 5 && currentCard < subscribes.length) && setCurrentCard(currentCard+1);
      (diff <-5 && currentCard > 1) && setCurrentCard(currentCard-1)

      setTouchPosition(null)
    }
    else return
  }

  const mq = window.matchMedia('(max-width: 321px)')

  return(
    <>
      <SubscriptionsHeader>
        <h1>My subscriptions</h1>
        {viewCard!==0 && <DefaultButton type="button" theme={mq.matches ? "text" : "secondary"} value="Upgrade" onClick={handleClick}/>}
      </SubscriptionsHeader>
      {(!subscribes?.length || isLoading)
        ?
        <EmptySubscriptions>
          <div><CloseIcon/></div>
          <h3>No active subscriptions</h3>
          <p>You can subscribe right now by clicking on the button below</p>
          <DefaultButton type="button" theme="primary" value="Get Gscore" onClick={() => {router.push("/")}}/>
        </EmptySubscriptions>
        :
        <>
          <SubscriptionsSlider position={currentCard}>
            <ul>
                {subscribes.map((subscribe, index) => {
                  return <SubscribeCard key={subscribe.id} {...subscribe} isActive={(index + 1) === currentCard} handleViewCard={handleViewCard} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}/>
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
      <Codes subscribeId={viewCard}/>
    </>
  )
}

const SubscriptionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1{
    line-height: 64px;
    font-size: 54px;
    font-weight: 700;

    @media (max-width: 426px) {
      line-height: 40px;
      font-size: 28px;
      font-weight: 700;
    }
  }
  
  button{
    min-width: 150px;
  }
`

const EmptySubscriptions = styled.div`
  display: flex;
  margin: 200px 0 0;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  h3{
    line-height: 40px;
    font-size: 28px;
    font-weight: 700;
  }
  p{
    margin: 0;
    max-width: 430px;
    line-height: 30px;
    font-size: 18px;
    font-weight: 500;
  }
  div{
    padding: 39px;
    background-color: ${colors.neutral["600"]};
    border-radius: 50px;
  }
  button{
    margin: 32px 0 0;
    width: 164px;
  }
  
  @media (max-width: 426px) {
    margin: 80px 0 0;
    h3{
      line-height: 30px;
      font-size: 22px;
    }
    p{
      margin: 0;
      line-height: 20px;
      font-size: 16px;
    }
  }
`

const SubscriptionsSlider = styled.div<{position: number}>`
  position: relative;
  
  ul{
    display: flex;
    position: absolute;
    left: ${props => props.position && `calc((1 - ${props.position})*648px)`};
    transition: 1s;

    @media (max-width: 426px) {
      left: ${props => props.position && `calc((1 - ${props.position})*332px)`};
    }

    @media (max-width: 321px) {
      left: ${props => props.position && `calc((1 - ${props.position})*272px)`};
    }
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
    @media (max-width: 321px) {
      margin-top: 300px;
      p{
        width: 100%;
        text-align: center;
        line-height: 22px;
        font-size: 18px;
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
