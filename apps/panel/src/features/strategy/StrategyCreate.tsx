import * as React from 'react';
import {
    ArrayInput,
    Create,
    FunctionField,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextField,
    TextInput
} from 'react-admin';
import {StrategyStatus, TradeAction, TradingRuleStatus} from '@shared/enums';
import {MarketKey} from "../../../../../libs/markets/src/enums";
import {ReferenceManyField} from "../../fields/ReferenceManyField";

export const StrategyCreate = () => {
    return <Create transform={(data: any) => ({
        ...data,
        items: data.items.map((item: any) => ({id: item}))
    })}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth/>
            <SelectInput validate={[required()]} defaultValue={MarketKey.TINKOFF} source="market"
                         choices={[
                             {id: MarketKey.TINKOFF, name: 'TINKOFF'},
                             {id: MarketKey.BINANCE, name: 'BINANCE'},
                         ]}/>
            <ReferenceManyField source={'items'} resource={'selection'} title={'Selections'} searchField={'name'}>
                <TextField source="id"/>
                <TextField source="name"/>
                <FunctionField label="Total items" render={(record: any) => `${record.items.length}`}/>
            </ReferenceManyField>
            <ArrayInput source="rules">
                <SimpleFormIterator inline>
                    <NumberInput validate={[required()]} source="change" helperText={false}/>
                    <NumberInput validate={[required()]} source="qty" helperText={false}/>
                    <NumberInput source="used" helperText={false} disabled defaultValue={0}/>
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