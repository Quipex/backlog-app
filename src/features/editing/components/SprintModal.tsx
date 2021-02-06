import React, {useEffect, useState} from 'react';
import {FormInput} from "semantic-ui-react";
import {SprintData} from "../../../components/sprint/model";
import CommonEditingModal from "./CommonEditingModal";

export interface ISprintModalProps {
  sprint?: SprintData;
  save: (val: SprintData) => void;
  onClose: () => void;
  remove?: () => void;
  removeDisabled?: string;
}

const SprintModal: React.FC<ISprintModalProps> = (
  {sprint, save, onClose, remove, removeDisabled}
) => {
  const editMode = sprint?.id !== undefined;
  const [values, setValues] = useState<SprintData>();

  useEffect(() => {
    if (sprint) {
      setValues(sprint);
    }
  }, [sprint]);

  return (
    <CommonEditingModal
      entityName="sprint"
      onClose={onClose}
      remove={remove as any}
      editMode={editMode}
      save={() => save(values as any)}
      entity={sprint}
      removeDisabled={removeDisabled}
      formControls={
        <>
          <FormInput
            label="Name"
            value={values?.name || ''}
            required
            autoFocus
            // @ts-ignore
            onChange={(ev, {value}) => setValues(prev => ({...prev, name: value}))}
          />
          <FormInput
            label="Max story points"
            value={values?.maxPoints || ''}
            type="number"
            required
            // @ts-ignore
            onChange={(ev, {value}) => setValues(prev => ({...prev, maxPoints: +value}))}
          />
        </>
      }
    />
  );
};

export default SprintModal;
