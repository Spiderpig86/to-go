import React from 'react';
import { Tag } from '../Tag';
import { TagColors } from '../../model/tag-color';

interface DeliveryTagProps {
    deliveryOptions: string[];
    setFilterInput: (value: string) => void;
}

const deliveryColorMap = new Map<string, TagColors>([
    ['grubhub', {backColor: '#ef333e', foreColor: '#fff'}],
    ['uber eats', {backColor: '#142127', foreColor: '#08bb68'}],
    ['doordash', {backColor: '#f6f6f6', foreColor: '#f82f08'}],
    ['postmates', {backColor: '#000', foreColor: '#f8f8f8'}],
    ['instacart', {backColor: '#f87e00', foreColor: '#fff'}],
    ['eat24', {backColor: '#b92c19', foreColor: '#fff'}],
    ['bite squad', {backColor: '#00b76e', foreColor: '#fff'}],
    ['caviar', {backColor: '#f26f40', foreColor: '#fff'}],
    ['amazon prime now', {backColor: '#00a3db', foreColor: '#fff'}]
]);

export const DeliveryTag: React.FC<DeliveryTagProps> = (props) => {
    
    return (
        <>
            { props.deliveryOptions.map((deliveryOption, index) => {
                const deliveryOptionKey = deliveryOption.toLowerCase();
                const tagColor = deliveryColorMap.get(deliveryOptionKey);
                
                return (
                    <Tag key={index} text={deliveryOption} tagColor={tagColor} setFilterInput={props.setFilterInput} />
                )
            }) }
        </>
    )
}