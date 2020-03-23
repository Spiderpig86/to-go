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
                        accessor: (restaurant: Restaurant) => restaurant.veganOptions
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
                    justifyContent: 'center'
                }}
            >
                <h1>🍴 Seattle Takeout.</h1>
                <div className="content">
                    <blockquote>
                        👋 Hey guys! This is very much WIP (UI changes, sorting, new restaurants, etc.), but I hope that this list of restaurants will
                        encourage people to support local restaurants that are struggling during this crisis. For any
                        new entries, please create a pull request{' '}
                        <a target="_blank" rel="noreferrer" href="https://github.com/Spiderpig86/seattle-takeout">here</a>.
                    </blockquote>
                    <RestaurantTable columns={columns} data={restaurantData} />
                </div>
            </div>
        </div>
    );
}

export default App;