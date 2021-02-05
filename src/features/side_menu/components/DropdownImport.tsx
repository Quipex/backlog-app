import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";

export interface IDropdownImportProps {
}

const DropdownImport: React.FC<IDropdownImportProps> = (props) => (
    <Dropdown
        icon="file"
        text="Import/Export"
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
