import * as React from 'react';
import {Show, SimpleShowLayout, TextField} from 'react-admin';

export const CatalogItemShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="title"/>
            <TextField source="markets"/>
        </SimpleShowLayout>
    </Show>
);