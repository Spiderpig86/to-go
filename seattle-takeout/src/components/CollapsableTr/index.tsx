import React, { useState } from 'react';
import { Row } from 'react-table';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Restaurant } from '../../model/restaurant';
import { StatusColorMap } from '../../model/status';

interface CollapsableTrProps {
    row: Row<Restaurant>;
}

export const CollapsableTr: React.FC<CollapsableTrProps> = props => {
    const row = props.row;
    const [collapsed, setCollapsed] = useState(true);

    const collapsedClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        setCollapsed(!collapsed);
    };
    const rowColor = props.row.original.status ? StatusColorMap.get(props.row.original.status) : 'inherit';

    return (
        <tr
            {...row.getRowProps()}
            className={`table__row ${collapsed ? 'table__row--collapsed' : ''}`}
            onClick={collapsedClick}
            css={{
                backgroundColor: rowColor
            }}
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
