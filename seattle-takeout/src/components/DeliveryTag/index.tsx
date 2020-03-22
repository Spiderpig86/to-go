import React from 'react';
import { Tag } from '../Tag';

interface DeliveryTagProps {
    deliveryOptions: string[];
}

export const DeliveryTag: React.FC<DeliveryTagProps> = (props) => {
    
    return (
        <>
            { props.deliveryOptions.map((type, index) => {
                return (
                    <Tag key={index} text={type} />
                )
            }) }
        </>
    )
}