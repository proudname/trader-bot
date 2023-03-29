import {useCreate, useUpdate} from "react-admin";

type UseReferenceArrayFixParams = {
    action: 'create' | 'update',
    transform: (item: any) => any,
    field: string,
    resource: string,
}

export const useReferenceArrayFix = ({ action, transform, field, resource }: UseReferenceArrayFixParams) => {
    let actionFn: (...p: any[]) => void = () => {}
    switch (action) {
        case "create": {
            const [create] = useCreate();
            actionFn = create;
            break;
        }
        case "update": {
            const [update] = useUpdate();
            actionFn = update;
        }
    }

    const fixSubmit = (data: any) => {
        const dataCopy = {...data};
        dataCopy[field] = transform(dataCopy[field])
        actionFn(resource, { data: dataCopy })
    };

    return [
        fixSubmit
    ]
}
