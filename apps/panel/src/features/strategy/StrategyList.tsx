import {Button} from '@mui/material';
import {CreateButton, Datagrid, FunctionField, List, ListProps, TextField, TopToolbar, useUpdate} from 'react-admin';
import {CaretRightOutlined, PauseOutlined} from '@ant-design/icons';
import {StrategyStatus} from "@shared/enums";

const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

export const StrategyList = (props: ListProps) => {

    const [update] = useUpdate('strategy');

    return <List actions={<ListActions/>} {...props}>
        <Datagrid rowClick={'edit'}>
            <TextField source="id"/>
            <TextField source="name"/>
            <FunctionField source={'status'} render={(record: any) => <Button variant={'outlined'} onClick={(e) => {
                e.stopPropagation()
                update('strategy',
                    {
                        id: record.id,
                        data: {
                            id: record.id,
                            status: Number(record.status) === StrategyStatus.ENABLED ? StrategyStatus.DISABLED : StrategyStatus.ENABLED
                        },
                        previousData: record
                    })
            }}>
                {Number(record.status) === StrategyStatus.ENABLED ? <PauseOutlined/> : <CaretRightOutlined/>}
            </Button>}/>
        </Datagrid>
    </List>
};