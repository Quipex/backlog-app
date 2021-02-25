import React, {useCallback} from 'react';
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";
import {exportStateAndAskDownload} from "../../storage_actions/export";
import StateImporter from "../../storage_actions/StateImporter";
import {v4} from "uuid";
import {mapToStories, startImport} from "../../storage_actions/import";
import {useDispatch} from "react-redux";
import {importState, importStories} from '../../planner/plannerSlice';

export interface IDropdownImportProps {
}

const stateImporterId = v4();
const storiesImporterId = v4();

const DropdownImport: React.FC<IDropdownImportProps> = () => {
  const dispatch = useDispatch();
  const dispatchStateImport = useCallback(text => dispatch(importState(JSON.parse(text))), [dispatch]);
  const dispatchStoriesImport = useCallback(text => dispatch(importStories(mapToStories(text))), [dispatch]);

  return (
    <>
      <StateImporter
        uniqueId={stateImporterId}
        importText="Importing state..."
        successText="State imported!"
        onFileRead={dispatchStateImport}
        extension=".json"
      />
      <StateImporter
        uniqueId={storiesImporterId}
        importText="Importing stories..."
        successText="Stories imported!"
        onFileRead={dispatchStoriesImport}
        extension=".csv"
      />
      <Dropdown
        icon="file"
        text="Storage..."
        floating
        labeled
        button
        className="icon button teal"
      >
        <DropdownMenu>
          <DropdownItem onClick={() => startImport(stateImporterId)}>Import state...</DropdownItem>
          <DropdownItem onClick={() => exportStateAndAskDownload()}>Export state...</DropdownItem>
          <DropdownItem onClick={() => startImport(storiesImporterId)}>Import stories...</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default DropdownImport;
