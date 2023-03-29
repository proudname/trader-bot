import {CreateButton, Datagrid, List, ListProps, TextField, TopToolbar} from 'react-admin';


const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

export const SelectionItemList = (props: ListProps) => (
    <List actions={<ListActions/>} {...props}>
        <Datagrid rowClick={'edit'}>
            <TextField source="id"/>
            <TextField source="title"/>
        </Datagrid>
    </List>
);