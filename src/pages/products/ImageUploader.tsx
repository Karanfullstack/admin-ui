import { Form, Space, Typography, Upload, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const ImageUploader = ({ prevImage }: { prevImage: string }) => {
    const [image, seImage] = useState<string | null>(prevImage);

    const props: UploadProps = {
        name: 'file',
        showUploadList: false,
        fileList: [],
        beforeUpload: (file) => {
            const image = URL.createObjectURL(file);
            seImage(image);
            return false;
        },
    };
    return (
        <Form.Item name="image" rules={[{ required: true, message: 'Image is required.' }]}>
            <Upload {...props} listType="picture-card">
                {image ? (
                    <img src={image} alt="image" />
                ) : (
                    <Space direction="vertical" align="center">
                        <PlusOutlined />
                        <Typography.Text>Upload</Typography.Text>
                    </Space>
                )}
            </Upload>
        </Form.Item>
    );
};
export default ImageUploader;
