import React, { useState, useEffect, useMemo } from 'react';
import { RestaurantTable } from './components/RestaurantTable';
import Axios from 'axios';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Restaurant } from './model/restaurant';
import { TypeTag } from './components/TypeTag';
import { DeliveryTag } from './components/DeliveryTag';
import { LocationTag } from './components/LocationTag';
import { PriceTag } from './components/PriceTag';

import logo from './logo.svg';
import './App.css';

interface CellType {
    cell: {
        value: any;
    };
}

function App() {
    const [restaurantData, setRestaurantData] = useState([]);
    const [filterInput, setFilterInput] = useState('');


    useEffect(() => {
        (async () => {
            const response = await Axios.get(
                'https://raw.githubusercontent.com/Spiderpig86/seattle-takeout/master/data/restaurants.json'
            );
            setRestaurantData(response.data.restaurants);
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
                            return (value.website && value.website !== '') ? <a className="column-link u-block" href={value.website} target="_blank" rel="noopener noref">{value.name}</a> : <div>{value.name}</div>
                        },
                        sortType: (a, b) => {
                            return String(a.original.name).localeCompare(String(b.original.name));
                        }
                    },
                    {
                        Header: 'Types',
                        accessor: (restaurant: Restaurant) => restaurant.types,
                        Cell: ({ cell: { value } }: CellType) => <TypeTag types={value}  setFilterInput={setFilterInput} />
                    },
                    {
                        Header: 'Phone',
                        accessor: (restaurant: Restaurant) => restaurant.phone,
                        Cell: ({ cell: { value } }: CellType) => {
                            return (value && value !== '') ? <a css={{whiteSpace: 'nowrap'}} className="column-link" href={'tel:' + value} target="_blank" rel="noopener noref">{value}</a> : <div></div>
                        }
                    },
                    {
                        Header: 'Location',
                        accessor: (restaurant: Restaurant) => restaurant.locations,
                        Cell: ({ cell: { value } }: CellType) => <LocationTag locations={value} setFilterInput={setFilterInput} />
                    },
                    {
                        Header: 'Address',
                        accessor: (restaurant: Restaurant) => restaurant.address,
                        Cell: ({ cell: { value } }: CellType) => {
                            return (value && value !== '') ? <a className="column-link u-block" href={'https://maps.google.com/?q=' + value} target="_blank" rel="noopener noref">{value}</a> : <div></div>
                        }
                    },
                    {
                        Header: 'Delivery App(s)',
                        accessor: (restaurant: Restaurant) => restaurant.deliveryApps,
                        Cell: ({ cell: { value } }: CellType) => <DeliveryTag deliveryOptions={value} setFilterInput={setFilterInput} />
                    },
                    {
                        Header: 'Vegan Options',
                        accessor: (restaurant: Restaurant) => {
                            if (restaurant.veganOptions === null) {
                                return '❔';
                            }
                            return restaurant.veganOptions ? '✅' : '❌';
                        }
                    },
                    {
                        Header: 'Price',
                        accessor: (restaurant: Restaurant) => restaurant.price,
                        Cell: ({ cell: { value } }: CellType) => <PriceTag price={value} setFilterInput={setFilterInput} />
                    }
                ]
            }
        ],
        []
    );

    return (
        <div className="App">
            <div
                className="u-flex u-text-center h-100"
                css={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: '7rem'
                }}
            >
                <h1>🍴 SeaToGo.</h1>
                <p>Restaurants offering deliveries in these tough times.</p>
                <div className="content">
                    <blockquote>
                        👋 Hey guys! This is very much WIP (UI changes, sorting, new restaurants, etc.), but I hope that this list of restaurants will
                        encourage people to support local restaurants that are struggling during this crisis. For any
                        new entries, please create a new issue{' '}
                        <a target="_blank" rel="noopener noref" href="https://github.com/Spiderpig86/seattle-takeout/issues/new">here</a>.
                    </blockquote>
                    <RestaurantTable columns={columns} data={restaurantData} {...{filterInput, setFilterInput}} />
                </div>
            </div>
            <footer>
                <div className="u-text-center content">
                    <h3 className="white">SeaToGo.</h3>
                    <div className="divider w-50 u-center" css={{
                        margin: '2rem auto'
                    }}></div>
                    <p>Powered by <a target="_blank" rel="noopener noref" href="https://spiderpig86.github.io/Cirrus/">Cirrus</a>. Made by your local foodie, <a target="_blank" rel="noopener noref" href="https://stanleylim.me">🍚 Stanley Lim</a>.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
