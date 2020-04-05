import React from 'react';
import ColorHash from 'color-hash';

import { Tag } from '../Tag';
import { TagColors } from '../../model/tag-color';

interface LocationTagProps {
    locations: string[];
    setFilterInput: (value: string) => void;
}

export const LocationTag: React.FC<LocationTagProps> = props => {
    const colorHash = new ColorHash({ lightness: 0.5 });
    return (
        <>
            {props.locations.map((location, index) => {
                const tagColor: TagColors = {
                    backColor: colorHash.hex(location),
                    foreColor: '#fff'
                }
                return <Tag key={index} text={location} tagColor={tagColor} setFilterInput={props.setFilterInput} />;
            })}
        </>
    );
};
