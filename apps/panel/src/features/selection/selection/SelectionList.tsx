import {CreateButton, Datagrid, FunctionField, List, ListProps, TextField, TopToolbar} from 'react-admin';


const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

export const SelectionList = (props: ListProps) => (
    <List actions={<ListActions/>} {...props}>
        <Datagrid rowClick={'edit'}>
            <TextField source="id"/>
            <TextField source="name"/>
            <FunctionField label="Total items" render={(record: any) => `${record.items.length}`}/>
        </Datagrid>
    </List>
);