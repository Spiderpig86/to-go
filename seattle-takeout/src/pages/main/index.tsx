import React, { useState, useEffect } from 'react';
import Axios from 'axios';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import TextLoop from "react-text-loop";

import { City } from '../../model/city';
import { Link } from 'react-router-dom';

import './index.css';

interface MainProps {}

export const Main: React.FC<MainProps> = (props) => {
    const [cities, setCities] = useState([]);
    const [cityNames, setCityNames] = useState(['', '']);

    useEffect(() => {
        (async () => {

            if (cities.length === 0) {
                const response = await Axios.get(
                    `https://raw.githubusercontent.com/Spiderpig86/sea-to-go/master/data/pages.json`
                );
                setCities(response.data.cities);
                setCityNames(response.data.cities.map((city: City) => city.name));
            }
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
            {
                console.log(cityNames)
                
            }
            <h1 className="u-flex u-veritcal-center u-horizontal-center">
                <img
                    src="/favicon-96x96.png"
                    className="mr-2"
                    css={{
                        borderRadius: '.25rem',
                        height: 'auto',
                        width: '4rem',
                    }}
                />{'  '}
                SeaToGo.
            </h1>
            <h3 className="font-alt font-light">
                Supporting local restaurants in {' '}
                <b
                    css={{
                        textTransform: 'capitalize',
                    }}
                >
                    <TextLoop interval={1500} children={cityNames} />
                </b>
                .
            </h3>
            <div className="content">
                <blockquote>
                    👋 Hey guys! This is very much WIP (UI changes, sorting, new restaurants, etc.), but I hope that
                    this list of restaurants will encourage people to support local restaurants that are struggling
                    during this crisis. For adding or updating restaurants, please fill out this{' '}
                    <a target="_blank" rel="noopener noref" href="https://forms.gle/KRtTQUevbPbUck5H8">
                        form
                    </a>
                    .
                </blockquote>
            </div>

            <h3 className="pb-5">Cities</h3>

            <div className="row w-100">
                {cities.map((city: City, i: number) => {
                    return (
                        <div className="col-4" key={i}>
                            <Link to={'/list/' + city.id}>
                                <figure
                                    className="figure figure--shadow"
                                    css={{
                                        borderRadius: '.25rem',
                                        position: 'relative',
                                    }}
                                >
                                    <div
                                        className="img-wrapper u-flex"
                                        css={{
                                            ':after': {
                                                backgroundColor: 'rgba(0, 0, 0, .05)',
                                                bottom: 0,
                                                content: '" "',
                                                height: '100%',
                                                left: 0,
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                width: '100%',
                                            },
                                        }}
                                    >
                                        <img className="figure__image" src={city.image_url} />
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
