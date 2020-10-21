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
    // EditButton,
    // DeleteButton,
    // RichTextField,
    SelectField,
    SelectInput,
    FileField,
    FileInput,
    DateField,
    ExportButton,
    useListContext,
    TopToolbar,
    sanitizeListRestProps,
    // Button
    // DateInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
// import { unparse as convertToCSV } from 'papaparse/papaparse.min';
// import IconEvent from '@material-ui/icons/Event';


const ListActions = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;
    const {
        currentSort,
        resource,
        filterValues,
        total,
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            <ExportButton
                delimiter={"/"}
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
        </TopToolbar>
    );
};

const OrderFilter = (props) => (
    <Filter context="order_id"  {...props}>
        <TextInput label="Order ID" source="order_id" alwaysOn />
        <TextInput label="SPID" source="spid" alwaysOn />
        <SelectInput source="status" alwaysOn allowEmpty choices={[
            { id: 0, name: 'New' },
            { id: 1, name: 'Accept' },
            { id: 2, name: 'OTW' },
            { id: 3, name: 'Start' },
            { id: 4, name: 'Finish' },
            // { id: 5, name: 'Not Found' },
            { id: 6, name: 'Not Found ' },
            { id: 7, name: 'Cancel Mitra' },
            { id: 8, name: 'Cancel Customer' },
            { id: 9, name: 'Batal Pesan' },
        ]} />
    </Filter>
);

export const OrderList = (props) => (
    <List {...props}
        actions={<ListActions />}
        filters={<OrderFilter />}
        bulkActionButtons={false}
        sort={{ field: 'time_order', order: 'DESC' }}
    >
        <Datagrid >
            <TextField source="order_id" />
            <TextField source="serviceName" />
            <TextField source="namaCust" />
            <TextField source="namaMitra" />
            <TextField source="spid" />
            <TextField source="harga" />
            <TextField source="voucher" />
            <TextField source="nilaiVoucher" />
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
                { id: 9, name: 'Batal Pesan' },
            ]} />
            <DateField source="time_order" showTime locales="en-gb" />
            {/* <TextField source="time_order" /> */}
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
            {/* <TextField source="emailMitra" /> */}
            <TextField source="order_id" />
            <TextField source="email_cust" />
            <TextField source="namaMitra" />
            <TextField source="namaCust" />
            <TextField source="spid" />
            <TextField source="serviceName" />
            <TextField source="harga" />
            <TextField source="nilaiVoucher" />
            <TextField source="voucher" />
            <TextField source="hargaAkhir" />
            <TextField source="genderCust" />
            <TextField source="genderPref" />
            <SelectField source="kotaId" choices={[
                { id: 1, name: 'Semarang' },
                { id: 2, name: 'Solo' },
                { id: 3, name: 'Yogyakarta' },
            ]} />
            <TextField source="kodepos" />
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
                { id: 9, name: 'Batal Pesan' },
            ]} />
            <TextField source="time_order" />
            <TextField source="time_service" />
            <TextField source="time_otw" />
            <TextField source="time_start" />
            <TextField source="time_finish" />
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
