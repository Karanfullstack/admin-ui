import { FormInstance } from 'antd';

export const ProductData = (form: FormInstance) => {
    const pricing = form.getFieldValue('priceConfiguration');
    const attributesConfig = form.getFieldValue('attributes');
    const attributes = Object.entries(attributesConfig).map(([key, value]) => {
        return {
            name: key,
            value,
        };
    });
    const priceConfiguration = Object.entries(pricing).reduce((acc, [key, value]) => {
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
        priceConfiguration,
        attributes,
    };
    const newFormData = new FormData();

    Object.entries(postData).forEach(([key, value]) => {
        if (key === 'image') {
            newFormData.append(key, (value as { file: File }).file);
        } else if (key === 'priceConfiguration' || key === 'attributes') {
            newFormData.append(key, JSON.stringify(value));
        } else {
            newFormData.append(key, value as string);
        }
    });

    for (const value of newFormData.values()) {
        console.log(value);
    }
    return newFormData as FormData;
};
