import React, {useEffect} from 'react';
import {UserStoryData} from "../../components/user_story/model";
import {SprintData} from "../../components/sprint/model";

export interface IUnsavedDropPreventerProps {
  stories: UserStoryData[];
  sprints: SprintData[];
}

const UnsavedDropPreventer: React.FC<IUnsavedDropPreventerProps> = ({sprints, stories}) => {
  useEffect(() => {
    window.onbeforeunload = () => 'There are unsaved changes!'
  }, [sprints, stories]);
  return null;
};

export default UnsavedDropPreventer;
