import { PathNode } from '@/interfaces/';
import { useStateContext } from '@/state/stateProvider';
import { Text } from '@fluentui/react-components';
import {
  BookStar20Filled,
  BookStar20Regular,
  BranchFork20Filled,
  BranchFork20Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  NavCategory,
  NavCategoryItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import Link from 'next/link';
import React from 'react';

const PathsIcons = bundleIcon(BranchFork20Filled, BranchFork20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);

const NavigationTree: React.FC = () => {
  const { state } = useStateContext();

  const nodeTree = state.data.nodes.paths
    .filter((path: PathNode) => path.decks.length > 0)
    .map((path: PathNode) => (
      <NavCategory key={path.id} value={path.id}>
        <NavCategoryItem icon={<PathsIcons />}>{path.title}</NavCategoryItem>
        <NavSubItemGroup>
          {path.decks.map((deck) => (
            <NavCategory key={deck.id} value={deck.id}>
              <NavCategoryItem icon={<DecksIcons />}>
                {deck.title}
              </NavCategoryItem>
              <NavSubItemGroup>
                {deck.cards.map((card) => (
                  <Link key={card.id} href={`/cards/${card.id}`}>
                    <NavSubItem value={`/cards/${card.id}`}>
                      <Text align='start'>{card.title}</Text>
                    </NavSubItem>
                  </Link>
                ))}
              </NavSubItemGroup>
            </NavCategory>
          ))}
        </NavSubItemGroup>
      </NavCategory>
    ));

  return <>{nodeTree}</>;
};

export default React.memo(NavigationTree);
