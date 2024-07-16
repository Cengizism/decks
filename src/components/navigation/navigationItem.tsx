import { useStateContext } from '@/state/stateProvider';
import { NavItem } from '@fluentui/react-nav-preview';
import Link from 'next/link';
import React from 'react';

interface NavigationItemProps {
  path: string;
  icon?: React.ReactElement;
  text: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  path,
  icon,
  text,
}) => {
  const { state, dispatch } = useStateContext();
  const { selectedNavigationItem } = state.interface;

  return (
    <Link href={path}>
      <NavItem
        icon={icon}
        value={path}
        onClick={() => dispatch({ type: 'SET_NAVIGATION_ITEM', payload: path })}
        aria-selected={selectedNavigationItem === path}
      >
        {text}
      </NavItem>
    </Link>
  );
};

export default React.memo(NavigationItem);
