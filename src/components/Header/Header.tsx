import {FC, useState} from "react"
import styled from "styled-components"
import {useAppSelector} from '../../store/index'
import {selectUser} from "../../store/User/selectors";
import Image from "next/image";
import Link from "next/link";


const Header:FC = () => {

  const user = useAppSelector(selectUser)

  const [navPopUp, setNavPopUp] = useState(false)
  const toggleNavPopUp = () => {
    setNavPopUp(!navPopUp)
  }

  const navBar = (user.token !== undefined)
    && <NavBar>
        <Link href="/">
          <a>My subscriptions</a>
        </Link>
        <NavPopUp>
          <PopUpUser onClick={toggleNavPopUp}>
            <p>{user.user.username}</p>
            {(navPopUp) ? <Image src="/Up.svg" width="14px" height="7px" alt="open popup"/> : <Image src="/Down.svg" width="14px" height="7px" alt="open popup"/>}
          </PopUpUser>
          {(navPopUp) &&
            <PopUp>
              <div>
                <Image src="/Settings.svg" width="24px" height="24px" alt="settings"/>
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </div>
              <div>
                <Image src="/Logout.svg" width="24px" height="24px" alt="logout"/>
                <Link href="/">
                  <a>Logout</a>
                </Link>
              </div>
            </PopUp>
          }
        </NavPopUp>
      </NavBar>

  return(
    <HeaderLayout>
      <Image src="/Logo.svg" width="170px" height="42px" alt="gscore"/>
      {navBar}
    </HeaderLayout>
  )
}

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 32px 0;
  @media (max-width: 426px) {
    padding: 25px 0 32px;
  }
`
const NavBar = styled.div`
  display: flex;
  align-items: center;

  line-height: 22px;
  font-size: 20px;
  font-weight: 500;
  
  a{
    margin: 0 20px 0 0;
  }
`

const NavPopUp = styled.div`
  position: relative;
`
const PopUpUser = styled.div`
  display: flex;
  p{
    margin-right: 10px;
  }
`
const PopUp = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 188px;
  padding: 30px 25px;
  border-radius: 12px;
  background-color: #272727; 
  div{
    display: flex;
    &:first-child{
      margin-bottom: 32px;
    }
    a{
      margin: 0 0 0 12px;
    }
  }
`


export default Header
