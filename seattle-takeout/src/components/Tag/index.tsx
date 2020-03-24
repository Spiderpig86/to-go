import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import './index.css';

interface TagProps {
    text: string;
    backgroundColor?: string;
}

export const Tag: React.FC<TagProps> = (props) => {
    return (
        <div className="tag app-tag" css={
        {
            backgroundColor: props.backgroundColor || 'inherit',
            fontSize: '85%',
            margin: '0.25rem',
            padding: '0.25rem',
        }}>
            { props.text }
        </div>
    )
} 