import Price from "../components/Price/Price";
import {fetchProducts} from "../store/Products/reducer";
import {Products} from "../store/Products/types";
import {FC} from "react";
import store from "../store";

const Home:FC<{ data: Products }> = ({data}) => {
  return (
    <Price {...data}/>
  )
}

export async function getServerSideProps() {
  await store.dispatch(fetchProducts())
  const data = await store.getState().products

  return {
    props: {
      data
    }
  }
}

export default Home
