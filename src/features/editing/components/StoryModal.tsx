import React, {useEffect, useState} from 'react';
import {FormGroup, FormInput, FormSelect, FormTextArea} from "semantic-ui-react";
import {StoryEditingData} from "../editingSlice";
import {getOptions, Priority, Risk, UserStoryData} from "../../../components/user_story/model";
import CommonEditingModal from "./CommonEditingModal";

export interface IStoryModalProps {
  editingData?: StoryEditingData;
  save: (val: StoryEditingData) => void;
  onClose: () => void;
  remove?: () => void;
}

const StoryModal: React.FC<IStoryModalProps> = (
  {editingData, save, onClose, remove}
) => {
  const editMode = editingData?.source !== undefined;
  const [values, setValues] = useState<UserStoryData>();

  useEffect(() => {
    if (editingData) {
      setValues(editingData.content);
    }
  }, [editingData]);

  return (
    <CommonEditingModal
      entityName="story"
      onClose={onClose}
      remove={remove as any}
      editMode={editMode}
      save={() => save({...editingData, content: values as any})}
      entity={editingData}
      formControls={
        <>
          <FormInput
            value={values?.name || ''}
            label="Name"
            required
            autoFocus
            // @ts-ignore
            onChange={(ev, {value}) => setValues(prev => ({...prev, name: value}))}
          />
          <FormTextArea
            value={values?.description || ''}
            label="Description"
            // @ts-ignore
            onChange={(ev, {value}) => setValues(prev => ({...prev, description: value}))}
          />
          <FormGroup widths="equal">
            <FormSelect
              value={values?.risk?.toString() || ''}
              options={getOptions(Risk)}
              label="Risk"
              required
              // @ts-ignore
              onChange={(ev, {value}) => setValues(prev => ({...prev, risk: +value}))}
            />
            <FormSelect
              value={values?.priority?.toString() || ''}
              options={getOptions(Priority)}
              label="Priority"
              required
              // @ts-ignore
              onChange={(ev, {value}) => setValues(prev => ({...prev, priority: +value}))}
            />
          </FormGroup>
          <FormInput
            value={values?.points || ''}
            type="number"
            label="Points"
            required
            // @ts-ignore
            onChange={(ev, {value}) => setValues(prev => ({...prev, points: +value}))}
          />
        </>
      }
    />
  );
};

export default StoryModal;
