import {FC, useState} from "react";
import styled from "styled-components";
import {colors} from "../../styles/colors";
import PersonalForm from "../../components/Settings/PersonalForm";
import PasswordForm from "../../components/Settings/PasswordForm";

export const enum settingStateTypes {
  PERSONAL = "PERSONAL",
  PASSWORD = "PASSWORD"
}

const Settings:FC = () => {

  const [settingState, setSettingState] = useState(settingStateTypes.PERSONAL)
  const handleSettingState = (state:settingStateTypes) => {
    return function () {
      setSettingState(state)
    }
  }

  const settingStateMapping = {
    PERSONAL: <PersonalForm/>,
    PASSWORD: <PasswordForm/>
  }

  return(
    <SettingsSection>
      <SettingsTitle>Settings</SettingsTitle>
      <SettingsNavBar>
        <SettingsNavItem state={(settingState===settingStateTypes.PERSONAL)} onClick={handleSettingState(settingStateTypes.PERSONAL)}>
          <p>Personal info</p>
          <hr/>
        </SettingsNavItem>
        <SettingsNavItem state={(settingState===settingStateTypes.PASSWORD)} onClick={handleSettingState(settingStateTypes.PASSWORD)}>
          <p>Change password</p>
          <hr/>
        </SettingsNavItem>
        <SettingsNavHr/>
      </SettingsNavBar>
      {settingStateMapping[settingState]}
    </SettingsSection>
  )
}

const SettingsSection = styled.section`
  min-height: 900px;
`
const SettingsTitle = styled.h1`
  margin: 10px 0 50px;
  line-height: 64px;
  font-size: 54px;
  font-weight: 700;
  @media (max-width: 426px) {
    margin: 0 0 32px 0;
    line-height: 40px;
    font-size: 28px;
  }
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
  cursor: pointer;
  p{
    margin: 0;
    padding: 0 25px 12px;
    text-align: center;
    line-height: 20px;
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.state ? colors.accent.primary : colors.neutral["600"]};
  }
  hr{
    border-top: 2px solid ${props => props.state ? colors.accent.primary : colors.neutral["600"]};
  }
`
const SettingsNavHr = styled.hr`
  width: 100%;
  border-top: 2px solid ${colors.neutral["600"]};
`

export default Settings