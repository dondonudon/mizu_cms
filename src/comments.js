// in src/Comments.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  DateInput,
  DateField,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  // DeleteButton,
  // RichTextField,
  // SelectInput
} from "react-admin";
// import RichTextInput from "ra-input-rich-text";

export const CommentList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="kodevoucher" />
      <TextField source="kuota" />
      <TextField source="nominal" />
      <TextField source="percentage" />
      <ShowButton label="" />
      <EditButton label="" />
      {/* <DeleteButton label="" redirect={false}/> */}
    </Datagrid>
  </List>
);

export const CommentShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="kodevoucher" />
      <TextField source="kuota" />
      <TextField source="nominal" />
      <TextField source="percentage" />
      <TextField source="isUsed" />
      <DateField source="createdAt" options={{ disabled: true }} />
      {/* <DateField source="lastupdate" options={{ disabled: true }} /> */}
    </SimpleShowLayout>
  </Show>
);

export const CommentCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="kodevoucher" />
      <TextInput source="kuota" />
      <TextInput source="nominal" />
      <TextInput source="percentage" />
    </SimpleForm>
  </Create>
);

export const CommentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" options={{ disabled: true }} />
      <DateInput source="createdAt" options={{ disabled: true }} />
      {/* <DateInput source="lastupdate" options={{ disabled: true }} /> */}
      <TextInput source="kodevoucher" />
      <TextInput source="kuota" />
      <TextInput source="nominal" />
      <TextInput source="percentage" />
      {/* <SelectInput source="rating" choices={[
        { id: 1, name: 'Good' },
        { id: 2, name: 'Okay' },
        { id: 3, name: 'Bad' },
      ]} /> */}
    </SimpleForm>
  </Edit>
);
