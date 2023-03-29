import * as React from 'react';
import {Edit, NumberInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {MarketKey} from "../../../../../libs/markets/src/enums";

export const PortfolioEdit = () => {
    return <Edit>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth/>
            <SelectInput validate={[required()]} defaultValue={MarketKey.TINKOFF} source="market"
                         choices={[
                             {id: MarketKey.TINKOFF, name: 'TINKOFF'},
                             {id: MarketKey.BINANCE, name: 'BINANCE'},
                         ]}/>
            <NumberInput source="qty" validate={[required()]} label="Quantity"/>
        </SimpleForm>
    </Edit>
};