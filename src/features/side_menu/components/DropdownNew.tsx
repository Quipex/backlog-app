import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";

export interface IDropdownNewProps {
}

const DropdownNew: React.FC<IDropdownNewProps> = (props) => (
  <Dropdown
    text="Create new"
    icon="plus"
    button
    floating
    labeled
    className="icon"
  >
    <DropdownMenu>
      <DropdownItem>User story...</DropdownItem>
      <DropdownItem>Sprint...</DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

export default DropdownNew;
