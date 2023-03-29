import * as React from 'react';
import {
    ArrayInput,
    AutocompleteArrayInput,
    Create,
    NumberInput,
    ReferenceArrayInput,
    required,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput
} from 'react-admin';
import {StrategyStatus, TradeAction, TradingRuleStatus} from '@shared/enums';

export const StrategyCreate = () => {
    return <Create transform={(data: any) => ({
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
                    <NumberInput validate={[required()]} source="change" helperText={false}/>
                    <SelectInput defaultValue={TradingRuleStatus.ACTIVE} disabled source="status" choices={[
                        {id: TradingRuleStatus.ACTIVE, name: 'Active'},
                        {id: TradingRuleStatus.EXECUTED, name: 'Executed'},
                    ]}/>
                    <SelectInput source="action" validate={[required()]} choices={[
                        {id: TradeAction.BUY, name: 'BUY'},
                        {id: TradeAction.SELL, name: 'SELL'},
                    ]}/>
                </SimpleFormIterator>
            </ArrayInput>
            <SelectInput source="status" validate={[required()]} defaultValue={StrategyStatus.ENABLED} choices={[
                {id: StrategyStatus.ENABLED, name: 'ENABLED'},
                {id: StrategyStatus.DISABLED, name: 'DISABLED'},
            ]}/>
        </SimpleForm>
    </Create>
};