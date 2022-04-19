import {FC, useState} from "react"
import styled from "styled-components"
import {useAppSelector} from '../../store'
import {selectUser} from "../../store/User/selectors";
import Logo from "../../../public/Logo.svg"
import Up from "../../../public/Up.svg"
import Down from "../../../public/Down.svg"
import Settings from "../../../public/Settings.svg";
import LogOut from "../../../public/Logout.svg"
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
            {(navPopUp) ? <Up width="16px" height="9px" alt="open popup"/> : <Down width="16px" height="9px" alt="open popup"/>}
          </PopUpUser>
          {(navPopUp) &&
            <PopUp>
              <div>
                <Settings width="24px" height="24px" alt="settings"/>
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </div>
              <div>
                <LogOut width="24px" height="24px" alt="logout"/>
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
      <Link href="/">
        <LogoLink><Logo width="170px" height="42px" alt="gscore"/></LogoLink>
      </Link>
      {navBar}
    </HeaderLayout>
  )
}

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
`
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
  align-items: center;
  cursor: pointer;
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
