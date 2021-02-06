import React from 'react';
import DropdownImport from "./components/DropdownImport";
import DropdownNew from "./components/DropdownNew";
import styles from './styles.module.scss';
import {UserStoryData} from "../../components/user_story/model";
import {BACKLOG} from "../planner/plannerSlice";
import StoriesDroppable from "../../components/stories_droppable/StoriesDroppable";

export interface ISideMenuProps {
  stories: UserStoryData[];
  isDragging: boolean;
}

const SideMenu: React.FC<ISideMenuProps> = (
  {stories, isDragging}
) => (
  <div className={styles.container}>
    <div className={styles.menus}>
      <DropdownNew/>
      <DropdownImport/>
    </div>
    <div className={styles.stories}>
      <StoriesDroppable
        droppableProps={{droppableId: BACKLOG}}
        className={`${styles.stories_droppable} ${isDragging ? styles.availableToDrop : ''}`}
        stories={stories}
      />
    </div>
  </div>
);

export default SideMenu;
