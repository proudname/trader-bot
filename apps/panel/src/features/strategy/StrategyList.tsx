import {
    TopToolbar,
    CreateButton,
    List,
    Datagrid,
    TextField,
    ListProps,
} from 'react-admin';


const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

export const StrategyList = (props: ListProps) => (
    <List actions={<ListActions/>} {...props}>
        <Datagrid rowClick={'edit'}>
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);