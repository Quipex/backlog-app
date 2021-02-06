import React from 'react';
import DropdownImport from "./components/DropdownImport";
import DropdownNew from "./components/DropdownNew";
import styles from './styles.module.scss';
import {UserStoryData} from "../../components/user_story/model";
import {DroppableStateSnapshot} from "react-beautiful-dnd";
import {BACKLOG} from "../planner/plannerSlice";
import StoriesDroppable from "../../components/stories_droppable/StoriesDroppable";

export interface ISideMenuProps {
  stories: UserStoryData[];
}

export const colorOf = (snapshot: DroppableStateSnapshot) => {
  if (snapshot.isDraggingOver) return '#97a0c3';
  if (snapshot.draggingFromThisWith) return '#947ba5'
}

const SideMenu: React.FC<ISideMenuProps> = (
  {stories}
) => (
  <div className={styles.container}>
    <div className={styles.menus}>
      <DropdownNew/>
      <DropdownImport/>
    </div>
    <StoriesDroppable droppableProps={{droppableId: BACKLOG}} className={styles.stories} stories={stories} />
  </div>
);

export default SideMenu;
