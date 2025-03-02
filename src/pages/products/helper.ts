import { FormInstance } from 'antd';

export const ProductData = (form: FormInstance) => {
    const pricing = form.getFieldValue('priceConfguration');
    const attributesConfig = form.getFieldValue('attributes');

    const attributes = Object.entries(attributesConfig).map(([key, value]) => {
        return {
            name: key,
            value,
        };
    });
    const priceConfguration = Object.entries(pricing).reduce((acc, [key, value]) => {
        const { key: parsedKey, priceType } = JSON.parse(key);
        return {
            ...acc,
            [parsedKey]: {
                priceType,
                avialableOptions: value,
            },
        };
    }, {});

    const postData = {
        ...form.getFieldsValue(),
        priceConfguration,
        attributes,
    };
    return postData;
};
