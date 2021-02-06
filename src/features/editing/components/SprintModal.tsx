import React, {useEffect, useState} from 'react';
import {Button, Form, FormInput, Modal, ModalContent, ModalHeader} from "semantic-ui-react";
import {SprintData} from "../../../components/sprint/model";

export interface ISprintModalProps {
  sprint?: SprintData;
  save: (val: SprintData) => void;
  onClose: () => void;
}

const SprintModal: React.FC<ISprintModalProps> = (
  {sprint, save, onClose}
) => {
  const editMode = sprint?.id !== undefined;
  const [values, setValues] = useState<SprintData>();

  useEffect(() => {
    if (sprint) {
      setValues(sprint);
    }
  }, [sprint]);

  return (
    <Modal onClose={onClose} open={sprint !== undefined} size="tiny">
      <ModalHeader>{`${editMode ? 'Edit' : 'Create'} sprint`}</ModalHeader>
      <ModalContent>
        {sprint && (
          <Form onSubmit={() => save(values as any)}>
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
            <Button type="submit" content="Save" color="olive"/>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SprintModal;
