import { Typography } from 'antd';

export default function CustpmBadge({ text }: { text: string }) {
    return (
        <div>
            <Typography.Text
                className={` bg-[rgba(246,95,66,0.12)]  py-[7px] px-3 text-xs text-[#f65f42]  rounded-2xl  inline-block w-[100px]  text-center font-[500]`}
            >
                {text}
            </Typography.Text>
        </div>
    );
}
