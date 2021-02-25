import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {setEditingSprint, setEditingStory} from '../../editing/editingSlice';

export interface IDropdownNewProps {
}

const DropdownNew: React.FC<IDropdownNewProps> = () => {
  const dispatch = useDispatch();

  return (
    <Dropdown
      text="Create..."
      icon="plus"
      button
      floating
      labeled
      className="icon button teal"
    >
      <DropdownMenu>
        <DropdownItem onClick={() => dispatch(setEditingStory({} as any))}>User story...</DropdownItem>
        <DropdownItem onClick={() => dispatch(setEditingSprint({} as any))}>Sprint...</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownNew;
