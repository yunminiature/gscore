import {FC} from "react";
import Subscribes from "../../components/Subscriptions/Subscribes";
import styled from "styled-components";
import {useAppSelector} from "../../store";
import {selectUser} from "../../store/User/selectors";
import {useRouter} from "next/router";

const SubscriptionsPage:FC = () => {

  const router = useRouter();
  const homeRouter = () => {
    router.push ("/")
  }

  const user = useAppSelector(selectUser)

  return(
    <>
      {
        user.token
          ? <SubscriptionsSection>
            <Subscribes/>
          </SubscriptionsSection>
          : homeRouter()
      }
    </>
  )
}

const SubscriptionsSection = styled.section`
  min-height: 900px;
  @media (max-width: 426px) {
    min-height: 600px;
  }
`

export default SubscriptionsPage