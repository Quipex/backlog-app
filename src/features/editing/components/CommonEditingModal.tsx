import React, {useState} from 'react';
import {Button, Confirm, Form, Modal, ModalContent, ModalHeader, Popup} from "semantic-ui-react";
import styles from "./styles.module.scss";

export interface ICommonEditingModalProps<T> extends IEditingFormProps<T> {
  entityName: string;
  onClose: () => void;
  remove: () => void;
  removeDisabled?: string;
  editMode: boolean;
  formControls: React.ReactFragment;
}

export interface IEditingFormProps<T> {
  save?: () => void;
  entity: T | undefined;
}

function CommonEditingModal<T>(
  {
    editMode, entity, entityName, onClose, remove, save, formControls, removeDisabled
  }: ICommonEditingModalProps<T>) {
  const [confirmOpen, setConfirmOpen] = useState<boolean>();

  const onRemoveClick = (ev: any) => {
    ev.preventDefault();
    setConfirmOpen(true);
  }

  return (
    <>
      <Confirm
        size="mini"
        content={`Are you sure you want to delete ${entityName}?`}
        open={confirmOpen}
        onConfirm={() => {
          if (remove) {
            remove();
          }
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
      <Modal open={entity !== undefined} onClose={onClose} size="tiny">
        <ModalHeader>{`${editMode ? 'Edit' : 'Create'} ${entityName}`}</ModalHeader>
        <ModalContent>
          {entity && (
            <Form onSubmit={save}>
              {formControls}
              <div className={styles.buttons}>
                <Button type="submit" color="green" content="Save"/>
                <div className={styles.placeholder}/>
                {editMode && (
                  <Popup
                    trigger={
                      <div>
                        <Button
                          type="push"
                          onClick={onRemoveClick}
                          color="red"
                          icon="trash alternate"
                          disabled={removeDisabled !== undefined}
                        />
                      </div>
                    }
                    disabled={removeDisabled === undefined}
                    content={removeDisabled}
                  />
                )}
              </div>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CommonEditingModal;
