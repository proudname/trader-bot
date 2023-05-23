import * as React from 'react';
import {DateField, FunctionField, NumberField, ReferenceField, Show, SimpleShowLayout, TextField} from 'react-admin';
import {traderActionMapper} from "@shared/mappers/trader-action.mapper";

export const HistoryShow = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="price" label="Price"/>
            <ReferenceField source="item" reference="selection-item">
                <TextField source="title"/>
                &nbsp;#<TextField source="id"/>
            </ReferenceField>
            <ReferenceField source="rule" reference="strategy-rule">
                <div>
                    - Change: <NumberField source="change"/>%
                </div>
                <div>
                    - Action: <FunctionField render={(record: any) => traderActionMapper(Number(record.action))}/>
                </div>
            </ReferenceField>
            <NumberField source={'qty'}/>
            <TextField source={'result'}/>
            <DateField source="createdAt"/>
        </SimpleShowLayout>
    </Show>
);