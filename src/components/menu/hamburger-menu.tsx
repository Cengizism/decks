import { Tooltip } from '@fluentui/react-components';
import { Hamburger } from '@fluentui/react-nav-preview';
import React from 'react';

interface HamburgerMenuProps {
  toggleHamburgerMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  toggleHamburgerMenu,
}) => {
  return (
    <Tooltip content='Navigation' relationship='label'>
      <Hamburger onClick={toggleHamburgerMenu} />
    </Tooltip>
  );
};

export default HamburgerMenu;
