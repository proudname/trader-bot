import * as React from 'react';
import {
    ArrayInput,
    Edit,
    minValue,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextField,
    TextInput
} from 'react-admin';
import {MarketKey} from "../../../../../../libs/markets/src/enums";
import {ReferenceOneField} from "../../../fields/ReferenceOneField";

export const SelectionEdit = () => {

    return <Edit>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth/>

            <SelectInput validate={[required()]} defaultValue={MarketKey.TINKOFF} source="market"
                         choices={[
                             {id: MarketKey.TINKOFF, name: 'TINKOFF'},
                             {id: MarketKey.BINANCE, name: 'BINANCE'},
                         ]}/>


            <ArrayInput source="items">
                <SimpleFormIterator inline>

                    <ReferenceOneField source={'catalogItem'} resource={'catalog-item'} searchField={'title'}
                                       title={'Catalog item'}>
                        <TextField source="id"/>
                        <TextField source="title"/>
                    </ReferenceOneField>

                    <NumberInput source="targetPrice" validate={[required()]}/>
                    <NumberInput source="maxQty" min={0} validate={[required(), minValue(0)]} label="Maximum quantity"/>

                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
};