import {FC, useState} from "react";
import {CodeDto, CodeStatus} from "../../../store/Codes/types";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {DefaultButton, DefaultCheckbox} from "../../../ui";
import {useAppSelector} from "../../../store";
import {selectProducts} from "../../../store/Products/selectors";

interface CodeCardProps extends CodeDto {
  activateCode: (code:string) => void,
  codesToManage: number,
  addCodeToManage: (addedCode:number) => void,
  deleteCodeToManage: (deletedCode:number) => void,
  isLoading: boolean
}

const CodeCard:FC<CodeCardProps> = (
  {
    id,
    code,
    origin,
    status,
    activateCode,
    subscribe,
    codesToManage,
    addCodeToManage,
    deleteCodeToManage,
    isLoading
}) => {

  const {products, productsLoading} = useAppSelector(selectProducts)
  const availableChecked = products.find(product => (product.id === subscribe.productId))?.sitesCount

  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    if (isChecked) {
      deleteCodeToManage(id)
    }
    else {
      addCodeToManage(id)
    }
    setIsChecked(!isChecked)
  }

  const handleClick = () => {
    activateCode(code)
  }

  return (
    <Code>
      {!productsLoading &&
        <CheckBoxArea state={status}>
          <DefaultCheckbox
            isChecked={isChecked}
            handleChange={handleChange}
            disabled={(status !== CodeStatus.HOLD && !isChecked) || (availableChecked !== undefined && codesToManage >= availableChecked && !isChecked)}
          />
          <p>{!isLoading && status}</p>
          <div>{status===CodeStatus.INACTIVE && <DefaultButton type="button" theme="secondary" value="Activate" onClick={handleClick}/>}</div>
        </CheckBoxArea>

      }
      <CodeArea>
        <h3>License code</h3>
        <p>{code}</p>
      </CodeArea>
      <DomainArea>
        <h3>Domain</h3>
        <p>{!isLoading && origin}</p>
      </DomainArea>
      <ActivateBtn>{status===CodeStatus.INACTIVE && <DefaultButton type="button" theme="secondary" value="Activate" onClick={handleClick}/>}</ActivateBtn>
      <StatusArea state={status}>
        <h3>Status</h3>
        <p>{!isLoading && status}</p>
      </StatusArea>
    </Code>

  )
}

const Code = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 0 32px;
  padding: 24px 32px;
  border-radius: 12px;
  background-color: ${colors.neutral["700"]};

  @media (max-width: 1440px) {
    flex-direction: column;
  }
  @media (max-width: 426px) {
    padding: 20px 32px;
  }
  
  h3{
    margin: 0 0 12px;
    line-height: 18px;
    font-size: 16px;
    font-weight: 700;
    color: ${colors.neutral["500"]};
  }
  p{
    margin: 0;
  }
  
  button{
    align-self: center;
    margin: 32px 0 0 56px;
    height: 58px;
  }
`

const CheckBoxArea = styled.div<{state:CodeStatus}>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 1441px) {
    width: 90%;
  }
  @media (max-width: 426px) {
    min-width: 220px;
  }
  
  p{
    margin: 32px 0 0 32px;
    line-height: 28px;
    font-size: 22px;
    font-weight: 700;
    color: ${props => props.state === CodeStatus.ACTIVE ? colors.green["300"] : (props.state === CodeStatus.INACTIVE ? colors.red["300"] : colors.orange["300"])};

    @media (min-width: 1441px) {
      display: none;
    }
    @media (max-width: 426px) {
      margin: 32px 0 0 18px;
      line-height: 20px;
      font-size: 18px;
    }
  }
  div{
    margin: 0 0 0 auto;
    @media (min-width: 1441px) {
      display: none;
    }
    @media (max-width: 426px) {
      margin: 0;
    }
  }
`

const CodeArea = styled.div`
  margin: 0 28px;
  width: 300px;
  p{
    padding: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 12px;
    background-color: ${colors.neutral["600"]};
    color: ${colors.neutral["500"]};
  }
  @media (max-width: 1440px) {
    margin: 32px 0 0;
    width: 90%;
  }
  @media (max-width: 426px) {
    min-width: 220px;
  }
`

const ActivateBtn = styled.div`
  @media (max-width: 1440px) {
    display: none;
  }
`

const DomainArea = styled.div`
  flex-grow: 1;
  min-width: 300px;
  p{
    padding: 25px;
    min-height: 68px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 12px;
    background-color: ${colors.neutral["600"]};
    color: ${colors.neutral["500"]};
  }
  @media (max-width: 1440px) {
    margin: 32px 0 0;
    width: 90%;
  }
  @media (max-width: 426px) {
    min-width: 220px;
  }
`

const StatusArea = styled.div<{state:CodeStatus}>`
  display: flex;
  flex-direction: column;
  margin: 0 56px;
  p{
    margin: auto 0;
    line-height: 28px;
    font-size: 22px;
    font-weight: 700;
    color: ${props => props.state === CodeStatus.ACTIVE ? colors.green["300"] : (props.state === CodeStatus.INACTIVE ? colors.red["300"] : colors.orange["300"])}
  }

  @media (max-width: 1440px) {
    display: none;
  }
`

export default CodeCard