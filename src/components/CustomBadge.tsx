import { Typography } from 'antd';
import { Status } from '../types';
export default function CustpmBadge({ text }: { text: string }) {
    const colorMap: Record<Status, string> = {
        'On the way': 'bg-[rgba(20,170,255,0.12)] text-[#14AAFF]',
        Preparing: 'bg-[rgba(235,87,87,0.12)] text-[#f65f42]',
        Delivered: 'bg-[rgba(33,150,83,0.12)] text-[#219653]',
    };
    return (
        <div>
            <Typography.Text
                className={` ${colorMap[text as Status]}  py-[7px] px-3 text-xs  rounded-2xl  inline-block w-[100px]  text-center font-[500]`}
            >
                {text}
            </Typography.Text>
        </div>
    );
}
