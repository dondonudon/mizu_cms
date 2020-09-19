// in src/posts.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  SimpleForm,
  SaveButton,
  Toolbar,
  // ReferenceField,
  // ReferenceInput,
  TextField,
  TextInput,
  BooleanField,
  ShowButton,
  // CloneButton,
  EditButton,
  NumberInput,
  BooleanInput,
  PasswordInput,
  required,
  // SaldoButton,
  // DeleteButton,
  // RichTextField,
  SelectInput,
  SelectField,
  EmailField,
  TabbedForm,
  FormTab,
  // FileField,
  // ImageInput,
  // ImageField,
  // DateField
} from "react-admin";
// import RichTextInput from "ra-input-rich-text";
import Button from '@material-ui/core/Button';

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="SPID" source="spid" alwaysOn />
    <TextInput label="No HP" source="noHp" alwaysOn />
    {/* <NumberInput label="Saldo" source="saldo" /> */}
    <SelectInput source="city" label="Kota" alwaysOn allowEmpty choices={[
      { id: 1, name: 'Semarang' },
      { id: 2, name: 'Solo' },
      { id: 3, name: 'Yogyakarta' },
    ]} />
    <SelectInput source="vertical" alwaysOn allowEmpty choices={[
      { id: 1, name: 'Massage' },
      { id: 2, name: 'Clean' },
      { id: 3, name: 'Auto' },
      { id: 4, name: 'Fix' },
      { id: 5, name: 'Glam' },
    ]} />
  </Filter>
);

const UserEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
);

const CustomButton = ({ record }) => (
  <Button></Button>
);

export const UserList = (props) => (
  <List {...props}
    filters={<UserFilter />}
    filterDefaultValues={{ type: 'mitra' }}
    bulkActionButtons={false}
    sort={{ field: 'spid', order: 'DESC' }}
  >
    <Datagrid>
      <TextField source="spid" label="SPID" />
      <TextField source="name" label="Name" />
      <TextField source="noHp" label="No HP" />
      <TextField source="gender" label="Gender" />
      <BooleanField source="active" label="Active" />
      <TextField source="saldo" label="Saldo" />
      <ShowButton label="" />
      <EditButton label="" />
      {/* <DeleteButton label="" redirect={false} /> */}
    </Datagrid>
  </List >
);

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="uid" />
      <TextField source="id" />
      <TextField source="spid" />
      <TextField source="noHp" />
      <EmailField source="email_" />
      <TextField source="name" />
      <TextField source="saldo" />
      <SelectField source="gender" choices={[
        { id: 'L', name: 'Laki-Laki' },
        { id: 'P', name: 'Perempuan' },
      ]} />
      <SelectField source="vertical" choices={[
        { id: 1, name: 'Massage' },
        { id: 2, name: 'Clean' },
        { id: 3, name: 'Auto' },
        { id: 4, name: 'Fix' },
        { id: 5, name: 'Glam' },
      ]} />
      <SelectField source="city" choices={[
        { id: 1, name: 'Semarang' },
        { id: 2, name: 'Solo' },
        { id: 3, name: 'Yogyakarta' },
      ]} />
      <TextField source="nik" />
      <TextField source="alamat" />
      <TextField source="emergency_number" />
      <TextField source="foto" />
    </SimpleShowLayout>
  </Show>
);

export const UserCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="spid" label="SPID" validate={[required()]} />
      <TextInput source="noHp" label="No HP" validate={[required()]} />
      <PasswordInput source="password" validate={[required()]} />
      <TextInput source="email_" type="email" validate={[required()]} />
      <TextInput source="name" validate={[required()]} />
      <SelectInput source="gender" validate={[required()]} choices={[
        { id: 'L', name: 'Laki-Laki' },
        { id: 'P', name: 'Perempuan' },
      ]} />
      <SelectInput source="city" label="Kota" validate={[required()]} choices={[
        { id: 1, name: 'Semarang' },
        { id: 2, name: 'Solo' },
        { id: 3, name: 'Yogyakarta' },
      ]} />
      <SelectInput source="vertical" label="Vertical" validate={[required()]} choices={[
        { id: 1, name: 'Massage' },
        { id: 2, name: 'Clean' },
        { id: 3, name: 'Auto' },
        { id: 4, name: 'Fix' },
        { id: 5, name: 'Glam' },
      ]} />
      <TextInput source="nik" label="NIK" />
      <TextInput source="alamat" validate={[required()]} />
      <TextInput source="emergency_number" label="Emergency Number" />
      <BooleanInput source="active" validate={[required()]} />
      <NumberInput source="saldo" validate={[required()]} />
      <TextInput source="foto" label="Foto" />
      {/* <ImageInput source="foto" label="Foto" accept="image/*">
        <ImageField source="foto" title="title" />
      </ImageInput> */}
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit undoable={false} {...props}>
    {/* <TabbedForm toolbar={<UserEditToolbar />}>
      <FormTab label="Mitra"> */}
    <SimpleForm toolbar={<UserEditToolbar />}>
      <TextInput source="spid" label="SPID" options={{ disabled: true }} />
      <TextInput source="noHp" label="No HP" />
      <PasswordInput source="password" validate={[required()]} />
      <TextInput source="email_" type="email" />
      <TextInput source="name" />
      <SelectInput source="gender" choices={[
        { id: 'L', name: 'Laki-Laki' },
        { id: 'P', name: 'Perempuan' },
      ]} />
      <SelectInput source="city" label="Kota" choices={[
        { id: 1, name: 'Semarang' },
        { id: 2, name: 'Solo' },
        { id: 3, name: 'Yogyakarta' },
      ]} />
      <SelectInput source="vertical" label="Vertical" choices={[
        { id: 1, name: 'Massage' },
        { id: 2, name: 'Clean' },
        { id: 3, name: 'Auto' },
        { id: 4, name: 'Fix' },
        { id: 5, name: 'Glam' },
      ]} />
      <TextInput source="nik" label="NIK" />
      <TextInput source="alamat" />
      <TextInput source="emergency_number" label="Emergency Number" />
      <BooleanInput source="active" />
      <NumberInput source="saldo" options={{ disabled: true }} />
      <TextInput source="foto" label="Foto" />
      {/* <ImageInput source="foto" label="Foto" accept="image/*">
        <ImageField source="foto" title="title" />
      </ImageInput> */}
    </SimpleForm>
    {/* </FormTab>
      <FormTab label="TopUp">
        <SelectInput source="order" label="Jenis Kredit" validate={[required()]} choices={[
          { id: 'T', name: 'TopUp' },
          { id: 'B', name: 'Bonus' },
        ]} />
        <NumberInput source="nominal" validate={[required()]} />
        <CustomButton />
      </FormTab>
    </TabbedForm> */}
  </Edit>
);
