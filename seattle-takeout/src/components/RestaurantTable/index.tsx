import React, { useState } from 'react';
import { useTable, useGlobalFilter, useGroupBy, useExpanded, useSortBy } from 'react-table';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Restaurant } from '../../model/restaurant';

import './index.css';

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
        useSortBy,
        useExpanded,
    );

    const handleFilterChange = (e: any) => {
        const value = e.target.value || '';
        setGlobalFilter(value);
        setFilterInput(value);
    };

    return (
        <div>
            <div
                css={{
                    margin: '1rem .25rem'
                }}
            >
                <input value={filterInput} onChange={handleFilterChange} placeholder={'Search for a restaurant...'} />
            </div>
            <div
                css={{
                    margin: '1rem 0',
                    overflowX: 'auto'
                }}
            >
                <table className="table bordered striped" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={
                                            column.isSorted
                                                ? column.isSortedDesc
                                                    ? 'column-sort--desc'
                                                    : 'column-sort--asc'
                                                : ''
                                        }
                                    >
                                        {column.render('Header')}
                                    </th>
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
