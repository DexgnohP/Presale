import React from 'react'
import { Tag } from 'antd';
import logo from "../images/logo.png"
import { Button } from 'antd';

export default function Card() {
    return (
        <div className='card-item'>
            <div className='card-logo'>
                <img src={logo} />
                <Tag color="success" className="tag">Live</Tag>
            </div>
            <div className='card-title'>
                Tiele
            </div>
            <div className='card-content'>
                img elements must have an alt prop, either with meaningful text, or an empty string asdasdsad asdasdasdasdasd ádasdsa
            </div>
            <div className='card-button'>
                <Button className='button-detail'>View Detail</Button>
            </div>
        </div>
    )
}
