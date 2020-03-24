import React from 'react';
import { Tag } from '../Tag';

interface LocationTagProps {
    location: string;
}

export const LocationTag: React.FC<LocationTagProps> = props => {
    return (
        <>
            <Tag text={props.location} />
        </>
    );
};
