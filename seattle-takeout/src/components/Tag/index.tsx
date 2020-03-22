import React from 'react';

interface TagProps {
    text: string;
}

export const Tag: React.FC<TagProps> = (props) => {
    

    return (
        <div className="tag">
            { props.text }
        </div>
    )
} 