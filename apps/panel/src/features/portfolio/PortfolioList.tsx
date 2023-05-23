import {CreateButton, Datagrid, FunctionField, List, ListProps, TextField, TopToolbar,} from 'react-admin';


const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

export const PortfolioList = (props: ListProps) => (
    <List actions={<ListActions/>} {...props}>
        <Datagrid rowClick={'edit'}>
            <TextField source="id"/>
            <FunctionField source="catalogItem" render={(record: any) => record.catalogItem.title}/>
            <TextField source="market"/>
            <TextField source="qty"/>
        </Datagrid>
    </List>
);