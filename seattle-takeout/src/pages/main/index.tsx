import React, { useState, useEffect } from 'react';
import Axios from 'axios';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { City } from '../../model/city';
import { Link } from 'react-router-dom';

import './index.css';

interface MainProps {}

export const Main: React.FC<MainProps> = (props) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await Axios.get(`data/pages.json`);
            console.log(response);

            setCities(response.data.cities);
        })();
    }, []);

    return (
        <div
            className="u-flex u-text-center h-100 content"
            css={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '7rem',
            }}
        >
            <h1>Cities</h1>

            <div className="row w-100">
                {cities.map((city: City, i: number) => {
                    console.log(city.image_url);

                    return (
                        <div className="col-4">
                            <Link to={'/list/' + city.id}>
                                <figure
                                    css={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        className="img-wrapper u-flex"
                                        css={{
                                            ':hover:after': {
                                                backgroundColor: 'rgba(0, 0, 0, .05)',
                                                bottom: 0,
                                                content: ' ',
                                                height: '100%',
                                                left: 0,
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                width: '100%',
                                            },
                                        }}
                                    >
                                        <img src={city.image_url} />
                                    </div>
                                    <figcaption
                                        className="figcaption h-100 w-100 u-center-alt"
                                        css={{
                                            color: '#fff',
                                            position: 'absolute',
                                        }}
                                    >
                                        {city.name}
                                    </figcaption>
                                </figure>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
