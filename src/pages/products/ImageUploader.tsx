import { Form, Space, Typography, Upload, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ImageUploader = () => {
    const props: UploadProps = {
        name: 'file',
        showUploadList: false,
        fileList: [],
        beforeUpload: () => {
            return false;
        },
    };
    return (
        <Form.Item name="image" rules={[{ required: true, message: 'Image is required.' }]}>
            <Upload {...props} listType="picture-card">
                <Space direction="vertical" align="center">
                    <PlusOutlined />
                    <Typography.Text>Upload</Typography.Text>
                </Space>
            </Upload>
        </Form.Item>
    );
};
export default ImageUploader;
