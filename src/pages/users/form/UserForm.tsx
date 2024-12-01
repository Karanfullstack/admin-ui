import { Card, Col, Form, Input, Row } from 'antd';

export default function UserForm() {
    return (
        <Row>
            <Col className="w-full">
                <Card title="Basic info">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item label="First Name">
                                <Input placeholder="Type Info..." name="firstName" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Last Name">
                                <Input placeholder="Type Info..." name="lastName" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}
