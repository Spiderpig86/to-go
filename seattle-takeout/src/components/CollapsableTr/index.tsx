import React, { useState } from 'react';
import { Row } from 'react-table';
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
            className={`table__cell ${collapsed ? 'table__cell--collapsed' : ''}`}
            onClick={collapsedClick}
        >
            {row.cells.map((cell, i) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
            })}
        </tr>
    );
};
