import { Card, Form, Radio, Switch, Typography } from 'antd';
import { Category } from '../../types';

export default function Attributes({ category }: { category: Category | null }) {
    if (!category) return null;

    return (
        <Card title={<Typography.Text>Attributes</Typography.Text>}>
            {category.attributes.map((attribute) => (
                <div key={attribute.name}>
                    {attribute.widgetType === 'radio' ? (
                        <Form.Item
                            name={['attributes', attribute.name]}
                            label={attribute.name}
                            initialValue={attribute.defaultValue}
                            rules={[{ required: true, message: `${attribute.name} is required` }]}
                        >
                            <Radio.Group>
                                {attribute.availableOptions.map((option) => (
                                    <Radio.Button defaultChecked value={option} key={option}>
                                        {option}
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                    ) : attribute.widgetType === 'switch' ? (
                        <Form.Item
                            name={['attributes', attribute.name]}
                            label={attribute.name}
                            initialValue={attribute.defaultValue}
                            valuePropName="checked"
                        >
                            <Switch defaultChecked checkedChildren="Yes" unCheckedChildren="No" />
                        </Form.Item>
                    ) : null}
                </div>
            ))}
        </Card>
    );
}

// TODO: WORK ON IT PROPPERLY
