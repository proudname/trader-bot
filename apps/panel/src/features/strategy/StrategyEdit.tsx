import * as React from 'react';
import {
    ArrayInput,
    AutocompleteArrayInput,
    Edit,
    NumberInput,
    ReferenceArrayInput,
    required,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
} from 'react-admin';
import {StrategyStatus, TradeAction, TradingRuleStatus} from "@shared/enums";

export const StrategyEdit = () => {
    return <Edit transform={(data) => ({
        ...data,
        items: data.items.map((item: any) => ({id: item}))
    })}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth/>
            <ReferenceArrayInput
                source="items"
                reference="selection"
            >
                <AutocompleteArrayInput
                    optionText={value => value.name + ' #' + value.id}
                />
            </ReferenceArrayInput>
            <ArrayInput source="rules">
                <SimpleFormIterator inline>
                    <NumberInput source="change" validate={[required()]} helperText={false}/>
                    <SelectInput source="status" disabled choices={[
                        {id: TradingRuleStatus.ACTIVE, name: 'Active'},
                        {id: TradingRuleStatus.EXECUTED, name: 'Executed'},
                    ]}/>
                    <SelectInput source="action" validate={[required()]} choices={[
                        {id: TradeAction.BUY, name: 'BUY'},
                        {id: TradeAction.SELL, name: 'SELL'},
                    ]}/>
                </SimpleFormIterator>
            </ArrayInput>
            <SelectInput source="status" validate={[required()]} choices={[
                {id: StrategyStatus.ENABLED, name: 'ENABLED'},
                {id: StrategyStatus.DISABLED, name: 'DISABLED'},
            ]}/>
        </SimpleForm>
    </Edit>
};