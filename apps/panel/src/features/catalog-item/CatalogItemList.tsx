import {Datagrid, FunctionField, List, ListProps, TextField} from 'react-admin';
import {MarketKey} from "../../../../../libs/markets/src/enums";


export const CatalogItemList = (props: ListProps) => (
    <List {...props}>
        <Datagrid rowClick={'show'}>
            <TextField source="id"/>
            <TextField source="title"/>
            <FunctionField source="markets"
                           render={(record: any) => record.markets.map((market: number) => MarketKey[market]).join(', ')}/>
        </Datagrid>
    </List>
);