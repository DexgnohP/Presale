import React from 'react'
import { Button } from 'antd';

import background from "../images/background.jpg"
import logo from "../images/logo.png"
import { List } from 'antd';
import Card from '../components/card';

export default function Home() {

    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 5',
        },
        {
            title: 'Title 6',
        },
    ];

    return (
        <div className='container'>
            <img src={background} className='background' />
            <div className='header'>
                <div className='nav-left'>
                    <img className='logo' src={logo} />
                    <span>MEMEPAD</span>
                </div>
                <Button className='button-connect'>Connect Wallet</Button>
            </div>
            <div className='content'>
                <div className='title'>List token Lauchpad</div>
                <List style={{ marginTop: "30px" }}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card />
                        </List.Item>
                    )}
                />
            </div>
            <div className='section-see'>
                <Button className='button-see'>See More ...</Button>
            </div>
        </div>
    )
}
