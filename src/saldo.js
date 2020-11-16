// in src/Saldo.js
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
    // ReferenceField,
    // ReferenceInput,
    TextField,
    DateField,
    TextInput,
    ShowButton,
    EditButton,
    // DeleteButton,
    // RichTextField,
    SelectInput,
    // FileField,
    // FileInput,
    NumberInput,
    // AutocompleteInput
} from "react-admin";
// import RichTextInput from "ra-input-rich-text";

const SaldoFilter = (props) => (
    <Filter {...props}>
        <TextInput label="SPID" source="spid" alwaysOn />
        <TextInput label="Order ID" source="orderId" />
        <SelectInput source="type" alwaysOn allowEmpty choices={[
            { id: 'CR', name: 'Credit' },
            { id: 'DB', name: 'Debit' },
        ]} />
        <SelectInput source="isDone" alwaysOn allowEmpty choices={[
            { id: true, name: 'True' },
            { id: false, name: 'False' },
        ]} />
    </Filter>
);

export const SaldoList = (props) => (
    <List {...props} filters={<SaldoFilter />}
        bulkActionButtons={false}
        sort={{ field: 'time', order: 'DESC' }}
    >
        <Datagrid>
            <TextField source="namaMitra" />
            <TextField source="orderId" />
            <TextField source="spid" />
            <TextField source="nominal" />
            <TextField source="type" />
            <TextField source="isDone" />
            <DateField source="time" />
            <ShowButton label="" />
            <EditButton label="" />
            {/* <DeleteButton label="" redirect={false} /> */}
        </Datagrid>
    </List>
);

export const SaldoShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="namaMitra" />
            <TextField source="orderId" />
            <TextField source="spid" />
            <TextField source="nominal" />
            <DateField source="time" />
            <TextField source="type" />
            <TextField source="isDone" />
        </SimpleShowLayout>
    </Show>
);

export const SaldoCreate = (props) => (
    <Create {...props} >
        <SimpleForm>


            <NumberInput source="nominal" />
            <SelectInput source="type" choices={[
                { id: 'CR', name: 'Credit' },
                { id: 'DB', name: 'Debit' },
            ]} />
        </SimpleForm>
    </Create>
);

export const SaldoEdit = (props) => (
    <Edit undoable={false} {...props}>
        <SimpleForm>
            <TextInput source="namaMitra" options={{ disabled: true }} />
            <TextInput source="orderId" options={{ disabled: true }} />
            <TextInput source="spid" options={{ disabled: true }} />
            <TextInput source="type" options={{ disabled: true }} />
            <NumberInput source="nominal" options={{ disabled: true }} />
            <SelectInput source="isDone" choices={[
                { id: true, name: 'True' },
                { id: false, name: 'False' },
            ]} />
        </SimpleForm>
    </Edit>
);
