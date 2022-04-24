import {FC} from "react";
import {DefaultButton} from "../../../ui";
import styled from "styled-components";
import {useAppSelector} from "../../../store";
import {selectProducts} from "../../../store/Products/selectors";
import {selectUser} from "../../../store/User/selectors";
import {useRouter} from "next/router";
import {DefaultPackage} from "../../../ui";

const Start:FC = () => {

  const {products} = useAppSelector(selectProducts)
  const user = useAppSelector(selectUser)

  const router = useRouter();
  const handleClick = () => {
    //sub
    router.push("/subscription")
  }

  return(
    <StartSection>
      <DefaultPackage
        headerTitle="Start your subscription"
        headerDescription="We have sent you a payment receipt by e-mail and a link to download the plugin with a license key."
        packageName={products.find(item => (item.id === user.package))?.name}
        price={products.find(item => (item.id === user.package))?.prices.find(item => item.isActive)?.price}
      />
      <DefaultButton type="button" theme="primary" value="Purchase" onClick={handleClick}/>
    </StartSection>
  )
}

const StartSection = styled.section`
  button{
    width: 100%;
  }
`

export default Start