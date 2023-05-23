import * as React from 'react';
import {
    ArrayInput,
    Edit,
    FunctionField,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextField,
    TextInput,
} from 'react-admin';
import {StrategyStatus, TradeAction, TradingRuleStatus} from "@shared/enums";
import {MarketKey} from "../../../../../libs/markets/src/enums";
import {ReferenceManyField} from "../../fields/ReferenceManyField";

export const StrategyEdit = () => {
    return <Edit transform={(data) => ({
        ...data,
        items: data.items.map((item: any) => ({id: item}))
    })}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth/>
            <ReferenceManyField source={'items'} resource={'selection'} title={'Selections'} searchField={'name'}>
                <TextField source="id"/>
                <TextField source="name"/>
                <FunctionField label="Total items" render={(record: any) => `${record.items.length}`}/>
            </ReferenceManyField>
            <SelectInput validate={[required()]} defaultValue={MarketKey.TINKOFF} source="market"
                         choices={[
                             {id: MarketKey.TINKOFF, name: 'TINKOFF'},
                             {id: MarketKey.BINANCE, name: 'BINANCE'},
                         ]}/>
            <ArrayInput source="rules">
                <SimpleFormIterator inline>
                    <NumberInput source="change" validate={[required()]} helperText={false}/>
                    <NumberInput validate={[required()]} source="qty" helperText={false}/>
                    <NumberInput source="used" helperText={false} disabled defaultValue={0}/>
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