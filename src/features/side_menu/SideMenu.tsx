import React from 'react';
import DropdownImport from "./components/DropdownImport";
import DropdownNew from "./components/DropdownNew";
import styles from './styles.module.scss';
import {UserStoryData} from "../../components/user_story/model";
import UserStoryCard from "../../components/user_story/UserStory";
import {Droppable} from "react-beautiful-dnd";
import {BACKLOG} from "../planner/plannerSlice";

export interface ISideMenuProps {
  stories: UserStoryData[];
}

const SideMenu: React.FC<ISideMenuProps> = (
  {stories}
) => (
  <div className={styles.container}>
    <div className={styles.menus}>
      <DropdownImport/>
      <DropdownNew/>
    </div>
    <Droppable droppableId={BACKLOG}>
      {provided => (
        <div
          className={styles.stories}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {stories.map((s, index) => <UserStoryCard story={s} index={index}/>)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default SideMenu;
