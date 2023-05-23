import {Button, Drawer, Grid} from "@mui/material";
import {Datagrid, List, RaRecord, SimpleShowLayout, TextInput, useInput} from "react-admin";
import * as React from "react";
import {useEffect, useState} from "react";

type Props = {
    children: React.ReactNode;
    source: string;
    resource: string;
    searchField?: string;
    title: string
}

export const ReferenceOneField = ({children, source, resource, title, searchField = 'id'}: Props) => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const {field, fieldState} = useInput({source});

    const [value, setValue] = useState<RaRecord>();
    const [touched, setTouched] = useState(false);

    const setFieldValue = (value: RaRecord) => {
        setTouched(true);
        setValue(value)
    }

    useEffect(() => {
        if (field.value && !value) {
            setValue(field.value);
        }
    }, [field.value])

    useEffect(() => {
        if (touched) {
            if (value) {
                field.onChange({id: value.id})
            } else {
                field.onChange()
            }
        }
    }, [value, touched])

    const getCatalogFilter = () => {
        if (value) {
            return {
                'id||$notin': value.id
            }
        }
        return {};
    }

    return <Grid container spacing={3} p={3}>
        <Grid item xs={12}>
            <label>{title}</label>
            {
                value &&
                <SimpleShowLayout record={value}>
                    {children}
                </SimpleShowLayout>
            }
            <Button onClick={() => setDrawerOpen(true)}>Chose</Button>
        </Grid>
        <Drawer anchor={'right'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Grid p={3}>

                <List
                    disableSyncWithLocation
                    resource={resource}
                    key={2}
                    exporter={false}
                    actions={false}
                    filter={getCatalogFilter()}
                    perPage={5}
                    filters={[<TextInput fullWidth label="Search" source={searchField} alwaysOn/>]}
                >
                    <Datagrid unselectable={'on'} bulkActionButtons={false} rowClick={(id, resource, record) => {
                        setFieldValue(record);
                        return false;
                    }}>
                        {children}
                    </Datagrid>
                </List>
            </Grid>

        </Drawer>
        {fieldState.error && <span>{fieldState.error.message}</span>}
    </Grid>
}