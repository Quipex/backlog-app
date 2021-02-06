import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  selectEditingSprint,
  selectEditingStory,
  setEditingSprint,
  setEditingStory,
  StoryEditingData
} from "./editingSlice";
import StoryModal from "./components/StoryModal";
import SprintModal from "./components/SprintModal";
import {removeSprint, removeStory, saveSprint, saveStory} from '../planner/plannerSlice';
import {SprintData} from "../../components/sprint/model";

export interface IEditingProps {
}

const Editing: React.FC<IEditingProps> = () => {
  const editingSprint = useSelector(selectEditingSprint);
  const editingStoryData = useSelector(selectEditingStory);
  const dispatch = useDispatch();

  return (
    <>
      <StoryModal
        editingData={editingStoryData}
        save={val => dispatch(saveStory(val))}
        onClose={() => dispatch(setEditingStory(undefined))}
        remove={() => dispatch(removeStory(editingStoryData as StoryEditingData))}
      />
      <SprintModal
        sprint={editingSprint as any}
        save={val => dispatch(saveSprint(val))}
        onClose={() => dispatch(setEditingSprint(undefined))}
        remove={() => dispatch(removeSprint(editingSprint as SprintData))}
        removeDisabled={editingSprint?.stories?.length && editingSprint.stories.length > 0 ?
          'Can\'t delete sprint while it contains stories'
          : undefined
        }
      />
    </>
  );
};

export default Editing;
