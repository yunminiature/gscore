import {FC, useEffect, useState} from "react";
import {CodeDto} from "../../../store/Codes/types";
import CodeCard from "../CodeCard";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../store";
import {unwrapResult} from "@reduxjs/toolkit";
import {activateCodeAsyncAction, fetchCodes, manageCodesAsyncAction} from "../../../store/Codes/thunks";
import {DefaultButton} from "../../../ui";
import {selectProducts} from "../../../store/Products/selectors";

interface CodesProps{
  subscribeId: number;
}

const Codes:FC<CodesProps> = ({subscribeId}) => {

  const dispatch = useAppDispatch()
  const {products} = useAppSelector(selectProducts)
  const [codes, setCodes] = useState<CodeDto[]>([])
  const [isLoading, setLoading] = useState(false)

  const updateCodes = () => {
    setLoading(true)
    dispatch(fetchCodes())
      .then(unwrapResult)
      .then((result) => {
        setCodes(result)
        setLoading(false)
      })
  }

  const activateCode = (code:string) => {
    setLoading(true)
    dispatch(activateCodeAsyncAction(code))
      .then(() => {
        updateCodes()
      })
  }

  const [codesToManage, setCodesToManage] = useState<number[]>([])
  const availableCodesToManage = products?.find(
    product =>
      (product.id === codes.find(
        (code) =>
          (code.subscribeId===subscribeId))?.subscribe.productId))?.sitesCount
  const addCodeToManage = (addedCode:number) => {
    setCodesToManage([...codesToManage, addedCode])
  }
  const deleteCodeToManage = (deletedCode:number) => {
    setCodesToManage(codesToManage.filter(
      (code: number) => {
        return code!==deletedCode
      }
    ))
  }

  const manageCodes = () => {
    setLoading(true)
    dispatch(manageCodesAsyncAction({codesIds: codesToManage, subscribeId}))
      .then(() => {
        updateCodes()
      })
  }

  useEffect(() => {
    updateCodes()
  },[])

  return(
    <>
      <CodesList>
        {codes.map((code: CodeDto) => {
          return code.subscribeId===subscribeId &&
            <CodeCard
              key={code.id}
              {...code}
              activateCode={activateCode}
              codesToManage={codesToManage.length}
              addCodeToManage={addCodeToManage}
              deleteCodeToManage={deleteCodeToManage}
              isLoading={isLoading}/>
        })}
      </CodesList>
      {codesToManage.length>0 &&
        <CodesManage>
          <div>
            Select the domains you want to keep
          </div>
          <DefaultButton
            type="button"
            theme="primary"
            value="Confirm" 
            onClick={manageCodes}
            disabled={codesToManage.length!==availableCodesToManage}/>
        </CodesManage>
      }
    </>
  )
}

const CodesList = styled.ul`
  margin: 32px 0 0;
`
const CodesManage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0 120px;
  
  div{
    line-height: 22px;
    font-size: 20px;
    font-weight: 700;
  }
`

export default Codes