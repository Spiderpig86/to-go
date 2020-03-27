import React, { useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useGroupBy, useExpanded, useSortBy, Row, useFilters } from 'react-table';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Restaurant } from '../../model/restaurant';

import './index.css';
import { CollapsableTr } from '../CollapsableTr';

interface RestaurantTableProps {
    columns: any;
    data: Restaurant[];
    filterInput: string;
    setFilterInput: (value: string) => void;
}

export const RestaurantTable: React.FC<RestaurantTableProps> = props => {
    const filterTypes = React.useMemo(
        () => ({
            restaurantFilter: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const restaurant: Restaurant = row.original;
                    filterValue = filterValue.toLowerCase();

                    const containsDelivery = restaurant.deliveryApps.some(delivery => delivery.toLowerCase().indexOf(filterValue) > -1);
                    if (containsDelivery) { return true; }
                    const containsLocation = restaurant.locations.some(location => location.toLowerCase().indexOf(filterValue) > -1);
                    if (containsLocation) { return true; }
                    const containsType = restaurant.types.some(type => type.toLowerCase().indexOf(filterValue) > -1);
                    if (containsType) { return true; }

                    return (
                        restaurant.name.toLowerCase().indexOf(filterValue) > -1
                        || restaurant.phone.indexOf(filterValue) > -1
                        || restaurant.address.toLowerCase().indexOf(filterValue) > -1
                        || restaurant.price.indexOf(filterValue) > -1
                    )
                });
            }
        }),
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter, setGlobalFilter } = useTable(
        {
            columns: props.columns,
            data: props.data,
            filterTypes,
            globalFilter: 'restaurantFilter'
        },
        useFilters,
        useGlobalFilter,
        useGroupBy,
        useSortBy,
        useExpanded
    );

    const handleFilterChange = (e: any) => {
        const value = e.target.value || '';
        setGlobalFilter(value);
        // setFilter('Name', value);
        props.setFilterInput(value);
    };

    useEffect(() => {
        const value = props.filterInput || '';
        setGlobalFilter(value);
        props.setFilterInput(value);
    }, [props.filterInput]);

    return (
        <div>
            <div
                css={{
                    margin: '1rem .25rem'
                }}
            >
                <input
                    type={'search'}
                    value={props.filterInput}
                    onChange={handleFilterChange}
                    placeholder={'Search by name, type, ...'}
                />
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
                                {headerGroup.headers.map((column, i) => (
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
                        {rows.map(row => {
                            prepareRow(row); // Allow row to get props dynamically
                            return (
                                <CollapsableTr row={row} />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
