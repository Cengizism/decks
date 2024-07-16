import { useStateContext } from '@/state/stateProvider';
import { ToolbarButton } from '@fluentui/react-components';
import {
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from '@fluentui/react-icons';
import React from 'react';

const ThemeSwitcher: React.FC = () => {
  const { state, dispatch } = useStateContext();

  const toggleTheme = () => {
    dispatch({
      type: 'SET_THEME',
      payload: state.interface.theme === 'light' ? 'dark' : 'light',
    });
  };

  const themeIcon =
    state.interface.theme === 'light' ? (
      <WeatherMoon24Regular />
    ) : (
      <WeatherSunny24Regular />
    );

  return (
    <ToolbarButton
      onClick={toggleTheme}
      aria-label='Toggle Theme'
      icon={themeIcon}
    />
  );
};

export default ThemeSwitcher;
