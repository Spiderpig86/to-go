import React, { useState, useEffect, useMemo } from 'react';
import { RestaurantTable } from './components/RestaurantTable';
import Axios from 'axios';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Restaurant } from './model/restaurant';
import { TypeTag } from './components/TypeTag';
import { DeliveryTag } from './components/DeliveryTag';

import logo from './logo.svg';
import './App.css';

interface CellType {
    cell: {
        value: any;
    };
}

function App() {
    const [restaurantData, setRestaurantData] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await Axios.get(
                'https://raw.githubusercontent.com/Spiderpig86/seattle-takeout/master/data/restaurants.json'
            );
            setRestaurantData(response.data.restaurants);
            console.log(restaurantData);
        })();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Restaurants',
                columns: [
                    {
                        Header: 'Name',
                        accessor: (restaurant: Restaurant) => restaurant.name
                    },
                    {
                        Header: 'Types',
                        accessor: (restaurant: Restaurant) => restaurant.types,
                        Cell: ({ cell: { value } }: CellType) => <TypeTag types={value} />
                    },
                    {
                        Header: 'Phone',
                        accessor: (restaurant: Restaurant) => restaurant.phone
                    },
                    {
                        Header: 'Location',
                        accessor: (restaurant: Restaurant) => restaurant.location
                    },
                    {
                        Header: 'Address',
                        accessor: (restaurant: Restaurant) => restaurant.address
                    },
                    {
                        Header: 'Website',
                        accessor: (restaurant: Restaurant) => restaurant.website
                    },
                    {
                        Header: 'Delivery App(s)',
                        accessor: (restaurant: Restaurant) => restaurant.deliveryApps,
                        Cell: ({ cell: { value } }: CellType) => <DeliveryTag deliveryOptions={value} />
                    },
                    {
                        Header: 'Vegan Options',
                        accessor: (restaurant: Restaurant) => {
                            if (restaurant.veganOptions === null) {
                                return  '';
                            }
                            return restaurant.veganOptions ? 'Yes' : 'No';
                        }
                    },
                    {
                        Header: 'Price',
                        accessor: (restaurant: Restaurant) => restaurant.price
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
                <h1>🍴 Seattle Takeout.</h1>
                <p>Restaurants offering deliveries in these tough times.</p>
                <div className="content">
                    <blockquote>
                        👋 Hey guys! This is very much WIP (UI changes, sorting, new restaurants, etc.), but I hope that this list of restaurants will
                        encourage people to support local restaurants that are struggling during this crisis. For any
                        new entries, please create a new issue{' '}
                        <a target="_blank" rel="noreferrer" href="https://github.com/Spiderpig86/seattle-takeout/issues/new">here</a>.
                    </blockquote>
                    <RestaurantTable columns={columns} data={restaurantData} />
                </div>
            </div>
            <footer>
                <div className="u-text-center content">
                    <h3 className="white">Seattle Takeout.</h3>
                    <div className="divider"></div>
                    <p>Powered by <a target="_blank" rel="noreferrer" href="https://spiderpig86.github.io/Cirrus/">Cirrus</a>. Made by your local foodie, <a target="_blank" rel="noreferrer" href="https://stanleylim.me">Stanley Lim</a>.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
