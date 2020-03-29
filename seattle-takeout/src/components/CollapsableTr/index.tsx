import React, { useState } from 'react';
import { Row } from 'react-table';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Restaurant } from '../../model/restaurant';

interface CollapsableTrProps {
    row: Row<Restaurant>;
}

export const CollapsableTr: React.FC<CollapsableTrProps> = props => {
    const row = props.row;
    const [collapsed, setCollapsed] = useState(true);

    const collapsedClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        setCollapsed(!collapsed);
    };

    return (
        <tr
            {...row.getRowProps()}
            className={`table__row ${collapsed ? 'table__row--collapsed' : ''}`}
            onClick={collapsedClick}
        >
            {row.cells.map((cell, i) => {
                return <td className={'table__cell'} {...cell.getCellProps()}>
                    <div css={{
                        display: 'grid',
                        maxWidth: '200px'
                    }}>
                        {cell.render('Cell')}
                    </div>
                </td>;
            })}
        </tr>
    );
};
