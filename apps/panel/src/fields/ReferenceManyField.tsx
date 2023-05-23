import {Button, Drawer, Grid} from "@mui/material";
import {Datagrid, List, RaRecord, TextInput, useInput} from "react-admin";
import * as React from "react";
import {useEffect, useState} from "react";

type Props = {
    children: React.ReactNode;
    source: string;
    resource: string;
    searchField?: string;
    title: string
}

export const ReferenceManyField = ({children, source, resource, title, searchField = 'id'}: Props) => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const {field, fieldState} = useInput({source});

    const [values, setValues] = useState<RaRecord[]>([]);
    const [touched, setTouched] = useState(false);

    const setFieldValue = (value: RaRecord[]) => {
        setTouched(true);
        setValues(value)
    }

    useEffect(() => {
        if (field.value && !values.length) {
            setValues(field.value);
        }
    }, [field.value])

    useEffect(() => {
        if (touched) {
            field.onChange(values.map((item: any) => ({id: item.id})))
        }
    }, [values])

    const getResultFilter = () => {
        if (values.length) {
            return {
                'id||$in': values.map((item: any) => item.id).join(',')
            }
        }
        return {'id': -1}
    }

    const getCatalogFilter = () => {
        if (values.length) {
            return {
                'id||$notin': values.map((item: any) => item.id).join(',')
            }
        }
        return {};
    }

    return <Grid container spacing={3} py={3}>
        <Grid item xs={12}>
            <label>{title}</label>
            <List disableSyncWithLocation
                  resource={resource}
                  key={1}
                  exporter={false}
                  actions={
                      <Button onClick={() => setDrawerOpen(true)}>Add</Button>
                  }
                  filter={getResultFilter()}
                  perPage={5}
                  filters={[<TextInput fullWidth label="Search" source={searchField} alwaysOn/>]}
                  empty={<Button onClick={() => setDrawerOpen(true)}>Add</Button>}
            >
                <Datagrid unselectable={'on'} bulkActionButtons={false} rowClick={(id, resource, record) => {
                    setFieldValue([...values].filter((item: any) => item.id !== record.id))
                    return false;
                }}>
                    {children}
                </Datagrid>
            </List>
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
                        setFieldValue([...values, record]);
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