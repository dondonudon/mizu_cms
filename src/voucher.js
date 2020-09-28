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
    // ShowButton,
    // EditButton,
    // DeleteButton,
    // RichTextField,
    SelectInput,
    // FileField,
    // FileInput,
    NumberInput,
    // AutocompleteInput
} from "react-admin";
// import RichTextInput from "ra-input-rich-text";

const VoucherFilter = (props) => (
    <Filter {...props}>
        <TextInput source="kodevoucher" label="Kode Voucher" alwaysOn />
        <NumberInput source="kuota" label="Kuota" />
        <NumberInput source="nominal" label="Nominal" />
        <NumberInput source="percentage" label="Percentage" />
    </Filter>
);

export const VoucherList = (props) => (
    <List {...props}
        filters={<VoucherFilter />}
        bulkActionButtons={false}>
        <Datagrid>
            <TextField source="kodevoucher" label="Kode Voucher" />
            <TextField source="kuota" />
            <TextField source="nominal" />
            <TextField source="percentage" />
            {/* <ShowButton label="" /> */}
            {/* <EditButton label="" /> */}
            {/* <DeleteButton label="" redirect={false} /> */}
        </Datagrid>
    </List>
);

export const VoucherShow = (props) => (
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

export const VoucherCreate = (props) => (
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

export const VoucherEdit = (props) => (
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
