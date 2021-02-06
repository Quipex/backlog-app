import React from 'react';
import UserStoryCard from "../user_story/UserStory";
import {Droppable} from "react-beautiful-dnd";
import {colorOf} from "../../features/side_menu/SideMenu";
import {UserStoryData} from "../user_story/model";

export interface IStoriesDroppableProps {
  droppableProps: {
    droppableId: string;
    isDropDisabled?: boolean;
  };
  className: string;
  stories: UserStoryData[];
}

const StoriesDroppable: React.FC<IStoriesDroppableProps> = (
  { droppableProps, className, stories }
) => (
  <Droppable {...droppableProps}>
    {(provided, snapshot) => (
      <div
        className={className}
        ref={provided.innerRef}
        style={{backgroundColor: colorOf(snapshot)}}
        {...provided.droppableProps}
      >
        {stories.map((s, index) => <UserStoryCard key={s.id} story={s} index={index}/>)}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default StoriesDroppable;
