import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { TagColors } from '../../model/tag-color';

import './index.css';

interface TagProps {
    text: string;
    tagColor?: TagColors
}

export const Tag: React.FC<TagProps> = (props) => {
    console.log(props);
    
    return (
        <div className="tag app-tag" css={
        {
            backgroundColor: props.tagColor ? `${props.tagColor.backColor} !important` : 'inherit',
            color: props.tagColor ? `${props.tagColor.foreColor} !important` : 'inherit',
            fontSize: '85%',
            margin: '0.25rem',
            padding: '0.25rem',
        }}>
            { props.text }
        </div>
    )
} 