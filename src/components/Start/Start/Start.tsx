import {FC} from "react";
import {DefaultButton} from "../../../ui";
import styled from "styled-components";
import {useAppSelector} from "../../../store";
import {useRouter} from "next/router";
import {DefaultPackage} from "../../../ui";
import {Product} from "../../../store/Products/types";
import {selectPackage} from "../../../store/User/selectors";

interface StartProps{
  products: Product[]
}

const Start:FC<StartProps> = ({products}) => {
  const userPackage = useAppSelector(selectPackage)

  const router = useRouter();
  const handleClick = () => {
    router.push("/subscriptions")
  }

  return(
    <StartSection>
      <DefaultPackage
        headerTitle="Start your subscription"
        headerDescription="We have sent you a payment receipt by e-mail and a link to download the plugin with a license key."
        packageName={products.find(item => (item.id === userPackage))?.name}
        price={products.find(item => (item.id === userPackage))?.prices.find(item => item.isActive)?.price}
      />
      <DefaultButton type="button" theme="primary" value="Go to my subscriptions" onClick={handleClick}/>
    </StartSection>
  )
}

const StartSection = styled.section`
  button{
    width: 100%;
  }
`

export default Start