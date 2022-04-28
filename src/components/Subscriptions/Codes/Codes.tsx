import {FC} from "react";
import {CodeDto} from "../../../store/Codes/types";
import CodeCard from "../CodeCard";
import styled from "styled-components";

interface CodesProps{
  subscribeId: number;
  codes: CodeDto[]
}

const Codes:FC<CodesProps> = ({subscribeId, codes}) => {

  return(
    <>
        <CodesList>
          {codes.map((code: CodeDto) => {
            return code.subscribeId===subscribeId && <CodeCard key={code.id} {...code}/>
          })}
        </CodesList>
    </>
  )
}

const CodesList = styled.ul`
  margin: 32px 0 0;
`

export default Codes