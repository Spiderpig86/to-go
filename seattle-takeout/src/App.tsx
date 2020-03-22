import React, { useState, useEffect, useMemo } from 'react';
import { RestaurantTable } from './components/RestaurantTable';
import Axios from 'axios';

import { Restaurant } from './model/restaurant';

import logo from './logo.svg';
import './App.css';
import { TypeTag } from './components/TypeTag';
import { DeliveryTag } from './components/DeliveryTag';

interface CellType {
  cell: {
    value: any
  }
}

function App() {

  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
      (async () => {
          const response = await Axios.get('https://raw.githubusercontent.com/Spiderpig86/seattle-takeout/master/data/restaurants.json');
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
            Header: "Name",
            accessor: (restaurant: Restaurant) => restaurant.name
          },
          {
            Header: "Types",
            accessor: (restaurant: Restaurant) => restaurant.types,
            Cell: ({ cell: { value } }: CellType) => <TypeTag types={value} />
          },
          {
            Header: "Phone",
            accessor: (restaurant: Restaurant) => restaurant.phone
          },
          {
            Header: "Location",
            accessor: (restaurant: Restaurant) => restaurant.location
          },
          {
            Header: "Address",
            accessor: (restaurant: Restaurant) => restaurant.address
          },
          {
            Header: "Website",
            accessor: (restaurant: Restaurant) => restaurant.website
          },
          {
            Header: "Delivery App(s)",
            accessor: (restaurant: Restaurant) => restaurant.deliveryApps,
            Cell: ({ cell: { value } }: CellType) => <DeliveryTag deliveryOptions={value} />
          },
          {
            Header: "Vegan Options",
            accessor: (restaurant: Restaurant) => restaurant.veganOptions
          },
          {
            Header: "Price",
            accessor: (restaurant: Restaurant) => restaurant.price
          },
        ]
      },
    ],
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <RestaurantTable columns={columns} data={restaurantData} />
      </header>
    </div>
  );
}

export default App;
