import Price from "../components/Price/Price";
import {fetchProducts} from "../store/Products/reducer";
import {Product} from "../store/Products/types";
import {FC} from "react";
import store from "../store";
import {unwrapResult} from "@reduxjs/toolkit";
import {GetServerSideProps} from "next";

export const getServerSideProps:GetServerSideProps = async () => {
  const data = await store.dispatch(fetchProducts()).then(unwrapResult)

  return{
    props:{
      data
    }
  }
}

const Home:FC<{data: Product[]}> = ({data}) => {
  return (
    <Price products={data}/>
  )
}

export default Home
