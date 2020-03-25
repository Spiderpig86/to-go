import React from 'react';
import ColorHash from 'color-hash';
import { Tag } from '../Tag';
import { TagColors } from '../../model/tag-color';

interface PriceTagProps {
    price: string;
}

const deliveryColorMap = new Map<string, TagColors>([
    ['$', { backColor: '#c6facc', foreColor: '#222' }],
    ['$$', { backColor: '#80eb99', foreColor: '#222' }],
    ['$$$', { backColor: '#57cc98', foreColor: '#fff' }],
    ['$$$$', { backColor: '#37a3a5', foreColor: '#fff' }],
    ['$$$$$', { backColor: '#21577b', foreColor: '#fff' }]
]);

export const TypeTag: React.FC<PriceTagProps> = props => {
    const tagColor = deliveryColorMap.get(props.price);
    return (
        <>
            return (
            <Tag text={props.price} tagColor={tagColor} />
        </>
    );
};
