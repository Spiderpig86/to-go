import React from 'react';
import ColorHash from 'color-hash';
import { Tag } from '../Tag';
import { TagColors } from '../../model/tag-color';

interface PriceTagProps {
    types: string[];
}

const deliveryColorMap = new Map<string, TagColors>([
    ['$', {backColor: '#ef333e', foreColor: '#fff'}],
    ['$$', {backColor: '#142127', foreColor: '#fff'}],
    ['$$$', {backColor: '#f6f6f6', foreColor: '#fff'}],
    ['$$$$', {backColor: '#f8f8f8', foreColor: '#fff'}],
    ['$$$$$', {backColor: '#f87e00', foreColor: '#fff'}],
]);

export const TypeTag: React.FC<PriceTagProps> = (props) => {
    

    return (
        <>
            { props.types.map((type, index) => {
                const tagColor: TagColors = {
                    backColor: colorHash.hex(type),
                    foreColor: '#fff'
                }
                return (
                    <Tag key={index} text={type} tagColor={tagColor} />
                )
            }) }
        </>
    )
}