import * as React from 'react';
import {Create, NumberInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {MarketKey} from "../../../../../libs/markets/src/enums";

export const PortfolioCreate = () => {
    return <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth/>
            <SelectInput validate={[required()]} defaultValue={MarketKey.TINKOFF} source="market"
                         choices={[
                             {id: MarketKey.TINKOFF, name: 'TINKOFF'},
                             {id: MarketKey.BINANCE, name: 'BINANCE'},
                         ]}/>
            <NumberInput source="qty" validate={[required()]} label="Quantity"/>
        </SimpleForm>
    </Create>
};