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
    ReferenceInput,
    TextField,
    // NumberField,
    TextInput,
    // NumberInput,
    ShowButton,
    EditButton,
    // DeleteButton,
    // RichTextField,
    SelectField,
    SelectInput,
    FileField,
    FileInput,
    DateField,
    // DateInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const OrderFilter = (props) => (
    <Filter context="order_id"  {...props}>
        <TextInput label="Order ID" source="order_id" alwaysOn />
        <TextInput label="SPID" source="spid" />
        <SelectInput source="status" alwaysOn allowEmpty choices={[
            { id: 0, name: 'New' },
            { id: 1, name: 'Accept' },
            { id: 2, name: 'OTW' },
            { id: 3, name: 'Start' },
            { id: 4, name: 'Finish' },
            { id: 5, name: 'Not Found' },
            { id: 6, name: 'Not Found ' },
            { id: 7, name: 'Cancel Mitra' },
            { id: 8, name: 'Cancel Customer' },
        ]} />
        {/* <DateInput label="Tanggal Order" source="time_order" showTime alwaysOn /> */}
    </Filter>
);

export const OrderList = (props) => (
    <List {...props}
        filters={<OrderFilter />}
        bulkActionButtons={false}
        sort={{ field: 'time_order', order: 'DESC' }}>
        <Datagrid >
            <TextField source="order_id" />
            <TextField source="serviceName" />
            <TextField source="namaCust" />
            <TextField source="namaMitra" />
            <TextField source="spid" />
            <TextField source="harga" />
            {/* <TextField source="hargaAkhir" /> */}
            <SelectField source="status" choices={[
                { id: 0, name: 'New' },
                { id: 1, name: 'Accept' },
                { id: 2, name: 'OTW' },
                { id: 3, name: 'Start' },
                { id: 4, name: 'Finish' },
                { id: 5, name: 'Not Found' },
                { id: 6, name: 'Not Found' },
                { id: 7, name: 'Cancel Mitra' },
                { id: 8, name: 'Cancel Customer' },
            ]} />
            <DateField source="time_order" showTime />
            <ShowButton label="" />
            {/* <EditButton label="" /> */}
            {/* <DeleteButton label="" redirect={false} /> */}
        </Datagrid>
    </List>
);

export const OrderShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="email_" />
            {/* <ReferenceField label="Comment" source="title" reference="comments">
        <TextField source="title" />
      </ReferenceField> */}
            <TextField source="name" />
            <TextField source="gender" />
            <TextField source="nik" />
            <FileField source="file.src" title="file.title" />
        </SimpleShowLayout>
    </Show>
);

export const OrderCreate = (props) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="title" />
            <RichTextInput source="body" />
            <ReferenceInput label="Comment" source="title" reference="comments">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <FileInput source="file" label="File" accept="application/pdf">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const OrderEdit = (props) => (
    <Edit undoable={false} {...props}>
        <SimpleForm>
            <ReferenceInput source="id" options={{ disabled: true }} />
            <ReferenceInput source="createdate" options={{ disabled: true }} />
            <ReferenceInput source="lastupdate" options={{ disabled: true }} />
            <ReferenceInput label="Comment" source="title" reference="comments">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="title" />
            <RichTextInput source="body" />
            <SelectInput source="rating" choices={[
                { id: 1, name: 'Good' },
                { id: 2, name: 'Okay' },
                { id: 3, name: 'Bad' },
            ]} />
            <FileInput source="file" label="File" accept="application/pdf">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);
