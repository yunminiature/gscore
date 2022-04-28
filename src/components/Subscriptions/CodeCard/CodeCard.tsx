import {FC, useState} from "react";
import {CodeDto, CodeStatus} from "../../../store/Codes/types";
import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {DefaultButton, DefaultCheckbox} from "../../../ui";

const CodeCard:FC<CodeDto> = ({code, origin, status}) => {

  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked (!isChecked)
  }

  return (
    <Code>
      <DefaultCheckbox isChecked={isChecked} handleChange={handleChange}/>
      <CodeArea>
        <h3>License code</h3>
        <p>{code}</p>
      </CodeArea>
      <DomainArea>
        <h3>Domain</h3>
        <p>{origin}</p>
      </DomainArea>
      {status===CodeStatus.INACTIVE && <DefaultButton type="button" theme="secondary" value="Activate"/>}
      <StatusArea state={status}>
        <h3>Status</h3>
        <p>{status}</p>
      </StatusArea>
    </Code>
  )
}

const Code = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 32px;
  padding: 24px 32px;
  border-radius: 12px;
  background-color: ${colors.neutral["700"]};
  
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

const CodeArea = styled.div`
  margin: 0 28px;
  max-width: 300px;
  p{
    padding: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 12px;
    background-color: ${colors.neutral["600"]};
    color: ${colors.neutral["500"]};
  }
`

const DomainArea = styled.div`
  max-width: 620px;
  min-width: 450px;
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
    color: ${props => props.state === CodeStatus.ACTIVE ? colors.green["300"] : (CodeStatus.INACTIVE ? colors.red["300"] : colors.orange["300"])}
  }
`

export default CodeCard