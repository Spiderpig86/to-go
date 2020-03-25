import React from 'react';
import ColorHash from 'color-hash';
import { Tag } from '../Tag';
import { TagColors } from '../../model/tag-color';

interface TypeTagProps {
    types: string[];
}

export const TypeTag: React.FC<TypeTagProps> = (props) => {
    const colorHash = new ColorHash({ lightness: 0.5 });

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