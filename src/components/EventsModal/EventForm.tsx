import React, { ChangeEventHandler, FormEventHandler } from 'react';


import { Form, FormGroup, Label, Input, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import ColorsDropdown from './ColorsDropdown';

import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  onDateChange: (date: Date) => void;
  onHideEventForm: () => void;
  onTextChange: ChangeEventHandler;
  onSelectColor: (color: string) => void;
  onSubmit: FormEventHandler;
  time: Date;
  text: string;
  color: string;

}

const EventForm = (props: IProps) => {
  return (
    <React.Fragment>
      <ModalHeader toggle={props.onHideEventForm}>Add new event</ModalHeader>
      <ModalBody size="lg">
        <Form onSubmit={props.onSubmit}>
          <FormGroup>
            <Label for="text">Remainder Text</Label>
            <Input type="textarea" value={props.text} onChange={props.onTextChange} name="text" id="text" />
          </FormGroup>
          <FormGroup>
            <Label>Time</Label>
            <div>
              <DatePicker
                selected={props.time}
                onChange={props.onDateChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="text">Color</Label>
            <ColorsDropdown selectedColor={props.color} onColorChange={props.onSelectColor} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={props.onSubmit}
          disabled={props.text.length === 0}
          color="primary"
          type="submit"
        >
          AddEvent
        </Button>
        {' '}
        <Button color="secondary" onClick={props.onHideEventForm}>Cancel</Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default EventForm;
