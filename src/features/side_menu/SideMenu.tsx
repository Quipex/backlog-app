import React from 'react';
import DropdownImport from "./components/DropdownImport";
import DropdownNew from "./components/DropdownNew";
import styles from './styles.module.scss';
import {UserStoryData} from "../../components/user_story/model";
import UserStoryCard from "../../components/user_story/UserStory";

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
    <div className={styles.stories}>
      {stories.map(s => (
        <UserStoryCard story={s} />
      ))}
    </div>
  </div>
);

export default SideMenu;
