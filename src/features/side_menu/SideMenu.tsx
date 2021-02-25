import React from 'react';
import DropdownImport from "./components/DropdownImport";
import DropdownNew from "./components/DropdownNew";
import styles from './styles.module.scss';
import {UserStoryData} from "../../components/user_story/model";
import {BACKLOG} from "../planner/plannerSlice";
import StoriesDroppable from "../../components/stories_droppable/StoriesDroppable";
import DropdownDebug from "./components/DropdownDebug";

export interface ISideMenuProps {
  stories: UserStoryData[];
  isDragging: boolean;
}

const SideMenu: React.FC<ISideMenuProps> = (
  {stories, isDragging}
) => (
  <div className={styles.container}>
    <div className={styles.menus}>
      <DropdownNew />
      <DropdownImport />
    </div>
    <DropdownDebug />
    <StoriesDroppable
      droppableProps={{droppableId: BACKLOG}}
      className={`${styles.stories_droppable} ${isDragging ? styles.availableToDrop : ''}`}
      stories={stories}
    />
  </div>
);

export default SideMenu;
