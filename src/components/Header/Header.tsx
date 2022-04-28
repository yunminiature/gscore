import {FC, useState} from "react"
import styled from "styled-components"
import {useAppDispatch, useAppSelector} from '../../store'
import {selectUser} from "../../store/User/selectors";
import {Logo} from "../../../public"
import {Up} from "../../../public"
import {Down} from "../../../public"
import {Menu} from "../../../public"
import {CloseIcon} from "../../../public"
import {Settings} from "../../../public";
import {Logout} from "../../../public"
import Link from "next/link";
import {colors} from "../../styles/colors";
import {signOutAction} from "../../store/User/actions";


const Header:FC = () => {

  const {
    token,
    user
  } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const signOut = () => {
    dispatch(signOutAction())
  }

  const [sideBar, setSideBar] = useState(false)
  const toggleSideBar = () => {
    setSideBar(!sideBar)
  }
  const [navPopUp, setNavPopUp] = useState(false)
  const toggleNavPopUp = () => {
    setNavPopUp(!navPopUp)
  }

  const navBar = (token !== undefined)
    && <>
      <NavBar>
        <Link href="/subscriptions">
          <a>My subscriptions</a>
        </Link>
        <NavPopUp>
          <PopUpUser onClick={toggleNavPopUp}>
            <p>{user.username}</p>
            {(navPopUp) ? <Up width="16px" height="9px"/> : <Down width="16px" height="9px"/>}
          </PopUpUser>
          {(navPopUp) &&
            <PopUp>
              <div>
                <Settings/>
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </div>
              <div>
                <Logout/>
                <Link href="/">
                  <a onClick={signOut}>Logout</a>
                </Link>
              </div>
            </PopUp>
          }
        </NavPopUp>
      </NavBar>
      <SideBar>
        <SideBarIcon onClick={toggleSideBar}><Menu width="24px" height="24px" /></SideBarIcon>
        {sideBar &&
          <SidePopUp>
            <SideBarHeader>
              <CloseIcon width="20px" height="20px" onClick={toggleSideBar}/>
              <Link href="/">
                <LogoLink><Logo width="170px" height="42px" /></LogoLink>
              </Link>
            </SideBarHeader>
            <div>
            <ul>
              <SideBarMenuItem>
                <Link href="/subscriptions">
                  <a>My subscriptions</a>
                </Link>
              </SideBarMenuItem>
              <SideBarMenuItem>
                <SideBarUsername onClick={toggleNavPopUp}>
                  {user.username}
                  {(navPopUp) ? <Up width="16px" height="9px"/> : <Down width="16px" height="9px"/>}
                </SideBarUsername>
                {navPopUp
                  && <SideBarSubmenu>
                      <SideBarSubmenuItem>
                        <Settings/>
                        <Link href="/settings">
                          <a>Settings</a>
                        </Link>
                      </SideBarSubmenuItem>
                      <SideBarSubmenuItem>
                        <Logout/>
                        <Link href="/">
                          <a onClick={signOut}>Logout</a>
                        </Link>
                      </SideBarSubmenuItem>
                    </SideBarSubmenu>
                }
              </SideBarMenuItem>
            </ul>
            </div>
          </SidePopUp>
        }
      </SideBar>
    </>


  return(
    <HeaderLayout>
      <Link href="/">
        <LogoLink><Logo width="170px" height="42px"/></LogoLink>
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
const SideBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  @media (min-width: 426px) {
    display: none;
  }
`
const SideBarIcon = styled.div`
`
const SideBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SideBarMenuItem = styled.li`
  padding: 20px 0;
  border-bottom: 1px solid ${colors.neutral["600"]};
  
  svg{
    width: 24px;
    height: 24px;
    stroke: ${colors.neutral["500"]}
  }
`
const SideBarUsername = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SideBarSubmenu = styled.ul`
  padding: 30px 0 0;
  color: ${colors.neutral["500"]}
`
const SideBarSubmenuItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 25px;
  
  a{
    margin-left: 8px;
  }

  &:last-child{
    padding: 0;
  }
`
const SidePopUp = styled.div`
  padding: 30px 35px;
  position: absolute;
  top: -30px;
  left: -250px;
  height: 100vh;
  width: 50vh;
  background-color: ${colors.neutral["700"]};
  
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

  @media (max-width: 426px) {
    display: none;
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
  background-color:${colors.neutral["700"]}; 
  div{
    display: flex;
    &:first-child{
      margin-bottom: 32px;
    }
    a{
      margin: 0 0 0 12px;
      cursor: pointer;
    }
    svg{
      width: 24px;
      height: 24px;
      stroke: ${colors.neutral["100"]}
    }
  }
`


export default Header
