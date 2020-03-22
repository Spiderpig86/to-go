import React from 'react';
import { Tag } from '../Tag';

interface TypeTagProps {
    types: string[];
}

export const TypeTag: React.FC<TypeTagProps> = (props) => {
    console.log(props);
    
    return (
        <>
            { props.types.map((type, index) => {
                return (
                    <Tag key={index} text={type} />
                )
            }) }
        </>
    )
}