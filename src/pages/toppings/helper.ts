import { FormInstance } from 'antd';
import { User } from '../../types';

export const ExtractForm = (form: FormInstance, fields: string[], user: User) => {
    const data = new FormData();
    fields.forEach((field) => {
        if (field === 'tenantId') {
            data.append(field, form.getFieldValue(field) || String(user?.tenant?.id));
        } else if (field === 'image') {
            data.append(field, (form.getFieldValue(field) as { file: File }).file || undefined);
        } else if (field === 'categoryId') {
            data.append(field, form.getFieldValue(field));
        } else if (field === 'price') {
            data.append(field, form.getFieldValue(field));
        } else if (field === 'name') {
            data.append(field, form.getFieldValue(field));
        } else if (field === 'isPublish') {
            data.append(field, form.getFieldValue(field) || false);
        }
    });
    return data;
};
