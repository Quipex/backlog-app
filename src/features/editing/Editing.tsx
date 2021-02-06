import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectEditingSprint, selectEditingStory, setEditingSprint, setEditingStory} from "./editingSlice";
import StoryModal from "./components/StoryModal";
import SprintModal from "./components/SprintModal";
import {saveSprint, saveStory} from '../planner/plannerSlice';

export interface IEditingProps {
}

const Editing: React.FC<IEditingProps> = () => {
  const editingSprint = useSelector(selectEditingSprint);
  const editingStory = useSelector(selectEditingStory);
  const dispatch = useDispatch();

  return (
    <>
      <StoryModal
        editingData={editingStory}
        save={val => dispatch(saveStory(val))}
        onClose={() => dispatch(setEditingStory(undefined))}
      />
      <SprintModal
        sprint={editingSprint}
        save={val => dispatch(saveSprint(val))}
        onClose={() => dispatch(setEditingSprint(undefined))}
      />
    </>
  );
};

export default Editing;
