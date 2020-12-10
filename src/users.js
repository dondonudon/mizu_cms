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

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="SPID" source="spid" alwaysOn />
    <TextInput label="No HP" source="noHp" alwaysOn />
    {/* <NumberInput label="Saldo" source="saldo" /> */}
    <SelectInput source="city" label="Kota" allowEmpty choices={[
      { id: 1, name: 'Semarang' },
      { id: 2, name: 'Solo' },
      { id: 3, name: 'Yogyakarta' },
      { id: 4, name: 'Surabaya' },
      { id: 5, name: 'Jabodetabek' },
      { id: 6, name: 'Bandung' },
      { id: 7, name: 'Medan' },
      { id: 8, name: 'Denpasar' },
      { id: 9, name: 'Balikpapan' },
      { id: 15, name: 'Banten' },
    ]} />
    <SelectInput source="vertical" allowEmpty choices={[
      { id: 1, name: 'Massage' },
      { id: 2, name: 'Clean' },
      { id: 3, name: 'Auto' },
      { id: 4, name: 'Fix' },
      { id: 5, name: 'Glam' },
    ]} />
    <SelectInput source="bp" label="Bussiness Partner" allowEmpty choices={[
      { id: 'MIZLF', name: 'MIZLF' },
      { id: 'LONRI', name: 'LONRI' },
      { id: 'AJENG', name: 'AJENG' },
      { id: 'KRANA', name: 'KRANA' },
      { id: 'NABIL', name: 'NABIL' },
      { id: 'MRWAN', name: 'MRWAN' },
      { id: 'BRKAH', name: 'BRKAH' },
      { id: 'KIZEN', name: 'KIZEN' },
      { id: 'TMBRA', name: 'TMBRA' },
      { id: 'RAJAW', name: 'RAJAW' },
      { id: 'KLENT', name: 'KLENT' },
    ]} />
  </Filter>
);

const UserEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
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
      <BooleanField source="status" label="Status" />
      <TextField source="imei" label="IMEI" />
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
      <TextField source="bp" />
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
        { id: 4, name: 'Surabaya' },
        { id: 5, name: 'Jabodetabek' },
        { id: 6, name: 'Bandung' },
        { id: 7, name: 'Medan' },
        { id: 8, name: 'Denpasar' },
        { id: 9, name: 'Balikpapan' },
        { id: 15, name: 'Banten' },
      ]} />
      <TextField source="nik" />
      <TextField source="alamat" />
      <TextField source="emergency_number" />
      <TextField source="noSk" />
      <TextField source="imei" />
      <TextField source="status" />
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
      <SelectInput source="bp" label="Bussiness Partner" choices={[
        { id: 'MIZLF', name: 'MIZLF' },
        { id: 'LONRI', name: 'LONRI' },
        { id: 'AJENG', name: 'AJENG' },
        { id: 'KRANA', name: 'KRANA' },
        { id: 'NABIL', name: 'NABIL' },
        { id: 'MRWAN', name: 'MRWAN' },
        { id: 'BRKAH', name: 'BRKAH' },
        { id: 'KIZEN', name: 'KIZEN' },
        { id: 'TMBRA', name: 'TMBRA' },
        { id: 'RAJAW', name: 'RAJAW' },
        { id: 'KLENT', name: 'KLENT' },
      ]} />
      <TextInput source="name" validate={[required()]} />
      <SelectInput source="gender" validate={[required()]} choices={[
        { id: 'L', name: 'Laki-Laki' },
        { id: 'P', name: 'Perempuan' },
      ]} />
      <SelectInput source="city" label="Kota" validate={[required()]} choices={[
        { id: 1, name: 'Semarang' },
        { id: 2, name: 'Solo' },
        { id: 3, name: 'Yogyakarta' },
        { id: 4, name: 'Surabaya' },
        { id: 5, name: 'Jabodetabek' },
        { id: 6, name: 'Bandung' },
        { id: 7, name: 'Medan' },
        { id: 8, name: 'Denpasar' },
        { id: 9, name: 'Balikpapan' },
        { id: 15, name: 'Banten' },
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
      <TextInput source="noSk" label="No SK" />
      <BooleanInput source="active" validate={[required()]} />
      <BooleanInput source="status" validate={[required()]} />
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
    <TabbedForm toolbar={<UserEditToolbar />}>
      <FormTab label="Mitra">
        {/* <SimpleForm toolbar={<UserEditToolbar />}> */}
        <TextInput source="spid" label="SPID" options={{ disabled: true }} />
        <TextInput source="noHp" label="No HP" />
        <PasswordInput source="password" validate={[required()]} />
        <TextInput source="email_" type="email" />
        <SelectInput source="bp" label="Bussiness Partner" choices={[
          { id: 'MIZLF', name: 'MIZLF' },
          { id: 'LONRI', name: 'LONRI' },
          { id: 'AJENG', name: 'AJENG' },
          { id: 'KRANA', name: 'KRANA' },
          { id: 'NABIL', name: 'NABIL' },
          { id: 'MRWAN', name: 'MRWAN' },
          { id: 'BRKAH', name: 'BRKAH' },
          { id: 'KIZEN', name: 'KIZEN' },
          { id: 'TMBRA', name: 'TMBRA' },
          { id: 'RAJAW', name: 'RAJAW' },
          { id: 'KLENT', name: 'KLENT' },
        ]} />
        <TextInput source="name" />
        <SelectInput source="gender" choices={[
          { id: 'L', name: 'Laki-Laki' },
          { id: 'P', name: 'Perempuan' },
        ]} />
        <SelectInput source="city" label="Kota" choices={[
          { id: 1, name: 'Semarang' },
          { id: 2, name: 'Solo' },
          { id: 3, name: 'Yogyakarta' },
          { id: 4, name: 'Surabaya' },
          { id: 5, name: 'Jabodetabek' },
          { id: 6, name: 'Bandung' },
          { id: 7, name: 'Medan' },
          { id: 8, name: 'Denpasar' },
          { id: 9, name: 'Balikpapan' },
          { id: 15, name: 'Banten' },
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
        <TextInput source="noSk" label="No SK" />
        <BooleanInput source="active" />
        <BooleanInput source="status" />
        <TextInput source="imei" />
        <NumberInput source="saldo" options={{ disabled: true }} />
        <TextInput source="foto" label="Foto" />
        {/* <ImageInput source="foto" label="Foto" accept="image/*">
        <ImageField source="foto" title="title" />
      </ImageInput> */}
        {/* </SimpleForm> */}
      </FormTab>
      {/* <FormTab label="TopUp">
        <SelectInput source="order" label="Jenis Kredit" validate={[required()]} choices={[
          { id: 'T', name: 'TopUp' },
          { id: 'B', name: 'Bonus' },
        ]} />
        <NumberInput source="nominal" validate={[required()]} />
        <CustomButton />
      </FormTab> */}
    </TabbedForm>
  </Edit>
);
