import * as React from 'react';
import {
    SimpleForm,
    TextInput,
    required,
    Edit,
    ReferenceArrayInput,
    AutocompleteArrayInput
} from 'react-admin';

export const SelectionEdit = () => {

    return <Edit transform={(data) => ({
        ...data,
        items: data.items.map((item: any) => ({id: item}))
    })}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth/>
            <ReferenceArrayInput
                source="items"
                reference="selection-item"
            >
                <AutocompleteArrayInput
                    optionText={value => value.title + ' #' + value.id}
                />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
};