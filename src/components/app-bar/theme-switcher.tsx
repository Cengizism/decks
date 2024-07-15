import { useStateContext } from '@/providers/state-provider';
import {
  Toolbar,
  ToolbarButton, // ToolbarDivider,
} from '@fluentui/react-components';
import {
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from '@fluentui/react-icons';
import React from 'react';

const ThemeSwitcher: React.FC = () => {
  const { state, setTheme } = useStateContext();

  const toggleTheme = () => {
    setTheme(state.theme === 'light' ? 'dark' : 'light');
  };

  const themeIcon =
    state.theme === 'light' ? (
      <WeatherMoon24Regular />
    ) : (
      <WeatherSunny24Regular />
    );

  return (
    <Toolbar aria-label='Default'>
      <ToolbarButton
        onClick={toggleTheme}
        aria-label='Toggle Theme'
        icon={themeIcon}
      />
      {/* <ToolbarDivider /> */}
    </Toolbar>
  );
};

export default ThemeSwitcher;
