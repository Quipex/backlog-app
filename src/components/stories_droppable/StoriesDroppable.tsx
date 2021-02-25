import React from 'react';
import UserStoryCard from "../user_story/UserStory";
import {Droppable} from "react-beautiful-dnd";
import {UserStoryData} from "../user_story/model";
import styles from './styles.module.scss';
import {useDispatch} from "react-redux";
import {setEditingStory} from '../../features/editing/editingSlice';

export interface IStoriesDroppableProps {
  droppableProps: {
    droppableId: string;
    isDropDisabled?: boolean;
  };
  className: string;
  stories: UserStoryData[];
}

const StoriesDroppable: React.FC<IStoriesDroppableProps> = (
  {droppableProps, className, stories}
) => {
  const dispatch = useDispatch();

  return (
    <Droppable {...droppableProps}>
      {(provided, snapshot) => (
        <div
          className={`${className} ${styles.droppableArea} ${snapshot.draggingOverWith ? styles.allowedToDrop : ''}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {stories.map((s, index) => (
            <UserStoryCard
              key={s.id}
              story={s}
              index={index}
              setEditing={() => dispatch(setEditingStory({
                source: {droppableId: droppableProps.droppableId, index},
                content: s
              }))}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default StoriesDroppable;
