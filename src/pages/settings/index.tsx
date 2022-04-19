import {FC, useState} from "react";
import styled from "styled-components";
import {colors} from "../../styles/colors";
import PersonalForm from "../../components/Settings/PersonalForm";
import PasswordForm from "../../components/Settings/PasswordForm";

const Settings:FC = () => {

  const [settingState, setSettingState] = useState("PERSONAL")
  const handleSettingState = (state:"PERSONAL"|"PASSWORD") => {
    setSettingState(state)
  }

  const form = () => {
    switch(settingState){
      case "PERSONAL":
        return <PersonalForm/>
      case "PASSWORD":
        return <PasswordForm/>
    }
  }

  return(
    <SettingsSection>
      <SettingsTitle>Settings</SettingsTitle>
      <SettingsNavBar>
        <SettingsNavItem state={(settingState==="PERSONAL")}>
          <p>Personal info</p>
          <hr/>
        </SettingsNavItem>
        <SettingsNavItem state={(settingState==="PASSWORD")}>
          <p>Change password</p>
          <hr/>
        </SettingsNavItem>
        <SettingsNavHr/>
      </SettingsNavBar>
      {form()}
    </SettingsSection>
  )
}

const SettingsSection = styled.section`
  min-height: 930px;
`
const SettingsTitle = styled.h1`
  margin: 0 0 50px;
  line-height: 64px;
  font-size: 54px;
  font-weight: 700;
`
const SettingsNavBar = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 0;
`
const SettingsNavItem = styled.li<{state:boolean}>`

  flex-shrink: 0;
  p{
    margin: 0;
    padding: 0 25px 12px;
    text-align: center;
    line-height: 20px;
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.state ? colors.accent.primary : colors.neutral["700"]};
  }
  hr{
    border-top: 2px solid ${props => props.state ? colors.accent.primary : colors.neutral["700"]};
  }
`
const SettingsNavHr = styled.hr`
  width: 100%;
  border-top: 2px solid ${colors.neutral["700"]};
`

export default Settings