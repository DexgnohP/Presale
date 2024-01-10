import React from 'react'
import { Button } from 'antd';

import background from "../images/background.jpg"
import logo from "../images/logo.png"
import dragon from "../images/dragon.png"
import { List } from 'antd';
import Card from '../components/card';

export default function Home() {

    const data = [
        {
            id: 1,
            name: "Dragon",
            logo: dragon,
            des: "Slaying 2024 with Dragon Memecoin: Soaring into the New Year!",
            end: false,
            min: 1,
            max: 5,
            time: "2024-01-09T13:00:00Z",
            totalRaised: 200,
            tele: "https://t.me/DragonYearx2024",
            tw: "https://twitter.com/LONGx2024",
            web: "https://dragon2024.net/",
            contractPresale: "GJK3vtLifwNNHwcsrnGXfN6CiyswVZh2u9nzQvuGZYba",
            driveSheet: "https://docs.google.com/spreadsheets/d/1otIVLjf2_QdNSFWc4M1e-15Eu0LRu00a_0RmSEkzMEU/edit?pli=1#gid=0",
        },
    ];

    const connect = () => {
        if (window.solana && window.solana.isPhantom) {
            window.solana.connect()
                .then(() => {
                    const publicKey = window.solana.publicKey.toString();
                    const truncatedPublicKey = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
                    const button = document.getElementById('connectButton');
                    button.textContent = `${truncatedPublicKey}`;
                })
                .catch((error) => {
                    console.error(`Unable to connect Phantom wallet: ${error.message}`);
                });
        }
    }

    return (
        <div className='container'>
            <img src={background} className='background' alt='img' />
            <div className='header'>
                <div className='nav-left'>
                    <img className='logo' src={logo} alt='img' />
                    <span>IDOSOL</span>
                </div>
                <Button id='connectButton' className='button-connect' onClick={connect}>Connect Wallet</Button>
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
                            <Card data={item} />
                        </List.Item>
                    )}
                />
            </div>
            {data.length > 6 && <div className='section-see'>
                <Button className='button-see'>See More ...</Button>
            </div>}

        </div>
    )
}
