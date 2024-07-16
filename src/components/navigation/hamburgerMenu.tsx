import { useStateContext } from '@/state/stateProvider';
import { Tooltip } from '@fluentui/react-components';
import { Hamburger } from '@fluentui/react-nav-preview';
import React, { useCallback } from 'react';

const HamburgerMenu: React.FC = () => {
  const { state, dispatch } = useStateContext();
  const { isNavigationDrawerOpen } = state.interface;

  const toggleHamburgerMenu = useCallback(() => {
    dispatch({
      type: 'TOGGLE_NAVIGATION_DRAWER',
      payload: !isNavigationDrawerOpen,
    });
  }, [isNavigationDrawerOpen, dispatch]);

  return (
    <Tooltip content='Navigation' relationship='label'>
      <Hamburger onClick={toggleHamburgerMenu} />
    </Tooltip>
  );
};

export default React.memo(HamburgerMenu);
