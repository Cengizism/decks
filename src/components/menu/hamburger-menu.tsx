import { Tooltip } from '@fluentui/react-components';
import { Hamburger } from '@fluentui/react-nav-preview';
import React from 'react';

const HamburgerMenu = ({
  toggleHamburgerMenu,
}: {
  toggleHamburgerMenu: () => void;
}) => {
  return (
    <Tooltip content='Navigation' relationship='label'>
      <Hamburger onClick={toggleHamburgerMenu} />
    </Tooltip>
  );
};

export default HamburgerMenu;
