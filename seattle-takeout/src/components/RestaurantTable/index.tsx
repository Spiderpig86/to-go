import React from 'react';
import { useTable } from 'react-table';

import './index.css';

interface RestaurantTableProps {
    columns: any;
    data: any;
}

export const RestaurantTable: React.FC<RestaurantTableProps> = (props) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns: props.columns,
        data: props.data
    });

    return (
        <div>
            <table className='table bordered striped' { ...getTableProps() }>
                <thead>
                    { headerGroups.map(headerGroup => (
                        <tr { ...headerGroup.getHeaderGroupProps() }>
                            {
                                headerGroup.headers.map(column => (
                                    <th { ...column.getHeaderProps() }>
                                        { column.render('Header') }
                                    </th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>
                <tbody { ...getTableBodyProps() }>
                    { rows.map((row, i) => {
                        prepareRow(row); // Allow row to get props dynamically
                        return (
                            <tr { ...row.getRowProps() }>
                                { row.cells.map(cell => {
                                    return <td { ...cell.getCellProps() }>
                                        { cell.render('Cell') }
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}