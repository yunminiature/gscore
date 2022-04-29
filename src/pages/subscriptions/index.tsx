import {FC, useEffect, useState} from "react";
import Subscribes from "../../components/Subscriptions/Subscribes";
import {DefaultButton} from "../../ui";
import styled from "styled-components";
import store, {useAppSelector} from "../../store";
import {selectUser} from "../../store/User/selectors";
import {useRouter} from "next/router";
import {unwrapResult} from "@reduxjs/toolkit";
import {fetchSubscribes} from "../../store/Subscribes/thunk";
import {fetchCodes} from "../../store/Codes/thunk";


const SubscriptionsPage:FC = () => {

  const router = useRouter();
  const homeRouter = () => {
    router.push ("/")
  }

  const user = useAppSelector(selectUser)
  const [subscribes, setSubscribes] = useState([])
  const [codes, setCodes] = useState([])

  useEffect(() => {
    (async () => {
      const subscribesData = await store.dispatch(fetchSubscribes()).then(unwrapResult)
      setSubscribes(subscribesData)

      const codesData = await store.dispatch(fetchCodes()).then(unwrapResult)
      setCodes(codesData)
    })()
  },[])

  return(
    <>
      {
        user.token
          ? <SubscriptionsSection>
            <SubscriptionsHeader>
              <h1>My subscriptions</h1>
              <DefaultButton type="button" theme="primary" value="Upgrade"/>
            </SubscriptionsHeader>
            <Subscribes subscribes={subscribes} codes={codes}/>
          </SubscriptionsSection>
          : homeRouter()
      }
    </>
  )
}

const SubscriptionsSection = styled.section`
  min-height: 900px;
`
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

export default SubscriptionsPage