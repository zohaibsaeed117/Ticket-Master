import React from 'react'
import { Input } from "@/components/ui/input"

interface InputGroupProps {
    Icon: any;
    size?: number | 20;
    [key: string]: any;
}

const InputGroup: React.FC<InputGroupProps> = ({ Icon, size, ...props }) => {
    return (
        <div className='w-full relative'>
            <Input className=' pl-10'
                {...props}
            />
            <Icon
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={size}
            />
        </div>
    )
}

export default InputGroup
