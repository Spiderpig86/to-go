import React, { useState } from 'react';
import { useTable, useGlobalFilter, useGroupBy, useExpanded } from 'react-table';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import './index.css';
import { Restaurant } from '../../model/restaurant';

interface ServerData {
    restaurants: Restaurant[];
}

interface RestaurantTableProps {
    columns: any;
    data: Restaurant[];
}

export const RestaurantTable: React.FC<RestaurantTableProps> = props => {
    const [filterInput, setFilterInput] = useState('');

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
        {
            columns: props.columns,
            data: props.data
        },
        useGlobalFilter,
        useGroupBy,
        useExpanded
    );

    const handleFilterChange = (e: any) => {
        const value = e.target.value || '';
        setGlobalFilter(value);
        setFilterInput(value);
    };

    return (
        <div>
            <div css={{
                margin: '1rem 0'
            }}>
                <input value={filterInput} onChange={handleFilterChange} placeholder={'Search for a restaurant...'} />
            </div>
            <div css={{
                margin: '1rem 0'
            }}>
                <table className="table bordered striped" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row); // Allow row to get props dynamically
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
