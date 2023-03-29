import * as React from 'react';
import {
    Create,
    SimpleForm, TextInput, required,
    ReferenceArrayInput, AutocompleteArrayInput
} from 'react-admin';

export const SelectionCreate = () => {
    return <Create transform={(data: any) => ({
        ...data,
        items: data.items.map((item: any) => ({id: item}))
    })}>
        <SimpleForm defaultValues={{
            items: []
        }}>
            <TextInput source="name" validate={[required()]} fullWidth />
            <ReferenceArrayInput
                source="items"
                reference="selection-item"
            >
                <AutocompleteArrayInput
                    optionText={value => value.title + ' #' + value.id}
                    inputText={value => value.title + ' #' + value.id}
                />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
};