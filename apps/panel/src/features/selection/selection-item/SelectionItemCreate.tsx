import * as React from 'react';
import {Create, minValue, NumberInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {MarketKey} from "../../../../../../libs/markets/src/enums";

export const SelectionItemCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth/>
            <SelectInput validate={[required()]} defaultValue={MarketKey.TINKOFF} source="market"
                         choices={[
                             {id: MarketKey.TINKOFF, name: 'TINKOFF'},
                             {id: MarketKey.BINANCE, name: 'BINANCE'},
                         ]}/>
            <NumberInput source="maxQty" min={0} validate={[required(), minValue(0)]} label="Maximum quantity"/>
        </SimpleForm>
    </Create>
);