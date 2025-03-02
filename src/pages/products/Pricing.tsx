import { Card, Form, InputNumber, Typography } from 'antd';
import { Category } from '../../types';

export default function Pricing({ category }: { category: Category | null }) {
    if (!category) return;
    return (
        <Card title="Product Price" className="mt-4 mb-4">
            {Object.entries(category.priceConfiguration).map(([key, value]) => (
                <div key={key}>
                    <div className="flex-col flex my-2  w-fit">
                        <Typography.Text className=" capitalize">{`${key} (${value.priceType})`}</Typography.Text>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {value.availableOptions.map((options) => (
                            <div key={options}>
                                <Form.Item
                                    name={[
                                        'priceConfguration',
                                        JSON.stringify({ key, priceType: value.priceType }),
                                        options,
                                    ]}
                                    label={options}
                                    rules={[{ required: true, message: 'Price is required' }]}
                                >
                                    <InputNumber
                                        addonAfter="$"
                                        className="w-full"
                                        size="large"
                                        placeholder={options}
                                    />
                                </Form.Item>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Card>
    );
}
