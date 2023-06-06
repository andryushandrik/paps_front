import { createTask } from '@/http/api';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Drawer, DrawerProps, Button, Form } from 'rsuite';

const DrawerView = (props: DrawerProps) => {
  const { onClose, ...rest } = props;
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  let { idFolder } = useParams();

  const addFolder = async () => {
    //@ts-ignore
    createTask({ name, description, folderId: idFolder }).then(data => onClose());
  };

  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Добавить папку</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={addFolder} appearance="primary">
            Сохранить
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Отмена
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Название</Form.ControlLabel>
            <Form.Control value={name} onChange={setName} name="name" style={{ width: 200 }} />
            <Form.ControlLabel>Описание</Form.ControlLabel>
            <Form.Control
              value={description}
              onChange={setDescription}
              name="name"
              style={{ width: 200 }}
            />
          </Form.Group>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
