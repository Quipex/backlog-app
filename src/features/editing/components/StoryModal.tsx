import React, {useEffect, useState} from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextArea,
  Modal,
  ModalContent,
  ModalHeader
} from "semantic-ui-react";
import {StoryEditingData} from "../editingSlice";
import {getOptions, Priority, Risk, UserStoryData} from "../../../components/user_story/model";

export interface IStoryModalProps {
  editingData?: StoryEditingData;
  save: (val: StoryEditingData) => void;
  onClose: () => void;
}

const StoryModal: React.FC<IStoryModalProps> = ({editingData, save, onClose}) => {
  const editMode = editingData?.source !== undefined;
  const [values, setValues] = useState<UserStoryData>();
  useEffect(() => {
    if (editingData) {
      setValues(editingData.content);
    }
  }, [editingData]);

  return (
    <Modal open={editingData !== undefined} onClose={onClose} size="tiny">
      <ModalHeader>{`${editMode ? 'Edit' : 'Create'} story`}</ModalHeader>
      <ModalContent>
        {editingData && (
          <Form onSubmit={() => save({...editingData, content: values as any})}>
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
            <Button type="submit">Save</Button>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default StoryModal;
