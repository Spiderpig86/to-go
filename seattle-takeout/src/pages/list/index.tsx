import React, { useState, useEffect, useMemo } from 'react';
import { RestaurantTable } from '../../components/RestaurantTable';
import Axios from 'axios';
import ColorHash from 'color-hash';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

import { Restaurant } from '../../model/restaurant';
import { TypeTag } from '../../components/TypeTag';
import { DeliveryTag } from '../../components/DeliveryTag';
import { LocationTag } from '../../components/LocationTag';
import { PriceTag } from '../../components/PriceTag';
import { FORM_URL, ENDPOINT_RESTAURANTS } from '../../constants';
import { RestaurantProperties } from '../../model/restaurant_properties';

interface CellType {
    cell: {
        value: any;
    };
}

interface ListProps {
    cityId: string;
}

export const List: React.FC<ListProps> = (props) => {
    const [restaurantData, setRestaurantData] = useState([]);
    const [properties, setPropertes] = useState({} as RestaurantProperties);
    const [filterInput, setFilterInput] = useState('');

    useEffect(() => {
        (async () => {
            const response = await Axios.get(`${ENDPOINT_RESTAURANTS}${props.cityId}.json`);
            setRestaurantData(response.data.restaurants);
            setPropertes(response.data.properties);
        })();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: `Restaurants`,
                columns: [
                    {
                        Header: 'Name',
                        accessor: (restaurant: Restaurant) => restaurant,
                        Cell: ({ cell: { value } }: CellType) => {
                            return value.website && value.website !== '' ? (
                                <a
                                    className="column-link u-block"
                                    href={value.website}
                                    target="_blank"
                                    rel="noopener noref"
                                >
                                    {value.name}
                                </a>
                            ) : (
                                <div>{value.name}</div>
                            );
                        },
                        sortType: (a, b) => {
                            return String(a.original.name).localeCompare(String(b.original.name));
                        },
                        filter: 'restaurantFilter',
                    },
                    {
                        Header: 'Types',
                        accessor: (restaurant: Restaurant) => restaurant.types,
                        Cell: ({ cell: { value } }: CellType) => (
                            <TypeTag types={value} setFilterInput={setFilterInput} />
                        ),
                        sortType: (a, b) => {
                            if (a.original.types.length === 0) {
                                return 1;
                            }

                            const typeListA = a.original.types;
                            const typeListB = b.original.types;
                            return typeListA.join().localeCompare(typeListB.join());
                        },
                    },
                    {
                        Header: 'Services',
                        accessor: (restaurant: Restaurant) => restaurant.services,
                        Cell: ({ cell: { value } }: CellType) => (
                            <TypeTag types={value} setFilterInput={setFilterInput} />
                        ),
                        sortType: (a, b) => {
                            if (a.original.types.length === 0) {
                                return 1;
                            }

                            const typeListA = a.original.services;
                            const typeListB = b.original.services;
                            return typeListA.join().localeCompare(typeListB.join());
                        },
                    },
                    {
                        Header: 'Phone',
                        accessor: (restaurant: Restaurant) => restaurant.phone,
                        sortType: (a, b) => {
                            const aNumber = a.original.phone.replace(/[\(\)\s-]/g, '');
                            const bNumber = b.original.phone.replace(/[\(\)\s-]/g, '');
                            return String(aNumber).localeCompare(String(bNumber));
                        },
                        Cell: ({ cell: { value } }: CellType) => {
                            return value && value !== '' ? (
                                <a
                                    css={{ whiteSpace: 'nowrap' }}
                                    className="column-link"
                                    href={'tel:' + value}
                                    target="_blank"
                                    rel="noopener noref"
                                >
                                    {value}
                                </a>
                            ) : (
                                <div></div>
                            );
                        },
                    },
                    {
                        Header: 'Location',
                        accessor: (restaurant: Restaurant) => restaurant.locations,
                        Cell: ({ cell: { value } }: CellType) => (
                            <LocationTag locations={value} setFilterInput={setFilterInput} />
                        ),
                        sortType: (a, b) => {
                            if (a.original.types.length === 0) {
                                return 1;
                            }

                            const typeListA = a.original.locations;
                            const typeListB = b.original.locations;
                            return typeListA.join().localeCompare(typeListB.join());
                        },
                    },
                    {
                        Header: 'Address',
                        accessor: (restaurant: Restaurant) => restaurant.address,
                        Cell: ({ cell: { value } }: CellType) => {
                            return value && value !== '' ? (
                                <a
                                    className="column-link u-block"
                                    href={'https://maps.google.com/?q=' + value}
                                    target="_blank"
                                    rel="noopener noref"
                                >
                                    {value}
                                </a>
                            ) : (
                                <div></div>
                            );
                        },
                    },
                    {
                        Header: 'Delivery App(s)',
                        accessor: (restaurant: Restaurant) => restaurant.deliveryApps,
                        Cell: ({ cell: { value } }: CellType) => (
                            <DeliveryTag deliveryOptions={value} setFilterInput={setFilterInput} />
                        ),
                        sortType: (a, b) => {
                            if (a.original.types.length === 0) {
                                return 1;
                            }

                            const typeListA = a.original.deliveryApps;
                            const typeListB = b.original.deliveryApps;
                            return typeListA.join().localeCompare(typeListB.join());
                        },
                    },
                    {
                        Header: 'Vegan Options',
                        accessor: (restaurant: Restaurant) => {
                            if (restaurant.veganOptions === null) {
                                return '❔';
                            }
                            return restaurant.veganOptions ? '✅' : '❌';
                        },
                    },
                    {
                        Header: 'Price',
                        accessor: (restaurant: Restaurant) => restaurant.price,
                        Cell: ({ cell: { value } }: CellType) => (
                            <PriceTag price={value} setFilterInput={setFilterInput} />
                        ),
                    },
                ],
            },
        ],
        []
    );

    return (
        <div
            className="u-flex u-text-center h-100"
            css={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '7rem',
                minHeight: '100vh',
            }}
        >
            <h1 className="u-flex u-veritcal-center u-horizontal-center">
                <img
                    src="/favicon-96x96.png"
                    className="mr-2"
                    css={{
                        borderRadius: '.25rem',
                        height: 'auto',
                        width: '4rem',
                    }}
                />{' '}
                {properties.name} to go.
            </h1>
            <p>
                Supporting local restaurants in <b>{properties.name}</b>. <br /> Check out{' '}
                <Link to="/">
                    more cities.
                </Link>
            </p>
            <div className="content">
                <blockquote>
                    👋 Hey guys! This is very much WIP (UI changes, sorting, new restaurants, etc.), but I hope that
                    this list of restaurants will encourage people to support local restaurants that are struggling
                    during this crisis. For adding or updating restaurants, please fill out this{' '}
                    <a target="_blank" rel="noopener noref" href={FORM_URL}>
                        form
                    </a>
                    .
                </blockquote>
                <RestaurantTable columns={columns} data={restaurantData} {...{ filterInput, setFilterInput }} />
            </div>
        </div>
    );
};
