import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {createRandomSprint, createRandomStory} from '../../planner/plannerSlice';

export interface IDropdownDebugProps {
}

const DropdownDebug: React.FC<IDropdownDebugProps> = () => {
  const dispatch = useDispatch();

  return (
    <Dropdown icon="bug" text="Debug" floating labeled button className="icon">
      <DropdownMenu>
        <DropdownItem
          onClick={() => {
            dispatch(createRandomStory())
          }}
        >Random story</DropdownItem>
        <DropdownItem
          onClick={() => {
            dispatch(createRandomSprint())
          }}
        >Random sprint</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownDebug;
