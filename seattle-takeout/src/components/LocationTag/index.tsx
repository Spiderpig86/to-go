import React from 'react';
import { Tag } from '../Tag';
import { TagColors } from '../../model/tag-color';

interface LocationTagProps {
    locations: string[];
    setFilterInput: (value: string) => void;
}

const locationColorMap = new Map<string, TagColors>([
    ['downtown', { backColor: '#b15928', foreColor: '#fff' }],
    ['belltown', { backColor: '#e31a1c', foreColor: '#fff' }],
    ['lower queen anne', { backColor: '#99cd00', foreColor: '#fff' }],
    ['international district', { backColor: '#0099cd', foreColor: '#fff' }],
    ['university district', { backColor: '#6a3d9a', foreColor: '#fff' }],
    ['capitol hill', { backColor: '#ff7f00', foreColor: '#fff' }],
    ['redmond', { backColor: '#ffca5d', foreColor: '#222' }],
    ['ballard', { backColor: '#cd0099', foreColor: '#fff' }],
    ['bothell', { backColor: '#fb8072', foreColor: '#fff' }],
    ['bellevue', { backColor: '#fdb462', foreColor: '#fff' }],
    ['fremont', { backColor: '#9900cd', foreColor: '#fff' }],
    ['greenlake', { backColor: '#8dd3c7', foreColor: '#fff' }],
    ['columbia city', { backColor: '#bebada', foreColor: '#fff' }]
]);

export const LocationTag: React.FC<LocationTagProps> = props => {
    return (
        <>
            {props.locations.map((location, index) => {
                const locationsKey = location.toLowerCase();
                const tagColor = locationColorMap.get(locationsKey);
                return <Tag key={index} text={location} tagColor={tagColor} setFilterInput={props.setFilterInput} />;
            })}
        </>
    );
};
