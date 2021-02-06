import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";

export interface IDropdownImportProps {
}

const DropdownImport: React.FC<IDropdownImportProps> = () => (
  <Dropdown
    icon="file"
    text="Storage..."
    floating
    labeled
    button
    className="icon"
  >
    <DropdownMenu>
      <DropdownItem>Import state...</DropdownItem>
      <DropdownItem>Export state...</DropdownItem>
      <DropdownItem>Export to PDF...</DropdownItem>
      <DropdownItem>Import stories...</DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

export default DropdownImport;
