import React, { useState, useEffect } from 'react'
import * as solanaWeb3 from "@solana/web3.js";
import { Tag } from 'antd';
import tele from "../images/tele.png"
import tw from "../images/tw.png"
import axios from 'axios';
import web from "../images/web.png"
import { Button, Modal, InputNumber, notification } from 'antd';
import * as buffer from "buffer";

window.Buffer = buffer.Buffer;

export default function Card({ data }) {
    const lamports_per_sol = solanaWeb3.LAMPORTS_PER_SOL;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState();
    const [valueSol, setValueSol] = useState("");
    const [status, setStatus] = useState();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (Object.keys(data).length) {
            if (data.end) {
                setStatus("End")
            } else {
                setStatus("Coming")
                const intervalId = setInterval(() => {
                    const newTimeRemaining = calculateTimeRemaining();
                    setTimeRemaining(newTimeRemaining);
                    if (newTimeRemaining.hours === 0 && newTimeRemaining.minutes === 0 && newTimeRemaining.seconds === 0) {
                        setStatus("Live")
                        clearInterval(intervalId);
                    }
                }, 1000);
                return () => {
                    clearInterval(intervalId);
                };
            }

        }
    }, [data]);

    function formatTimeUnit(value) {
        return value < 10 ? `0${value}` : value;
    }



    function calculateTimeRemaining() {
        const currentLocalDate = new Date();
        const targetUtcDate = new Date(data.time);

        const timeDiff = targetUtcDate - currentLocalDate;

        if (timeDiff <= 0) {
            return {
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const hours = formatTimeUnit(Math.floor(timeDiff / (1000 * 60 * 60)));
        const minutes = formatTimeUnit(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = formatTimeUnit(Math.floor((timeDiff % (1000 * 60)) / 1000));

        return {
            hours,
            minutes,
            seconds,
        };
    }

    const mapTypeStatus = () => {
        switch (status) {
            case "Live":
                return "success"
            case "End":
                return "error"
            default:
                return "warning"
        }
    }

    async function sendButtonClick() {
        const receiverAddress = "GJK3vtLifwNNHwcsrnGXfN6CiyswVZh2u9nzQvuGZYba"
        await signInTransactionAndSendMoney(receiverAddress)
    }



    const send = () => {
        if (!window.solana.publicKey) {
            notification.error({
                message: `Error`,
                description: `Please Conenct Phantom Wallet`,
                placement: "topRight",
            });
        } else if (!valueSol) {
            notification.error({
                message: `Error`,
                description: `Please Enter Quantity Solana`,
                placement: "topRight",
            });
        }
        else {
            sendButtonClick()
        }
    }

    async function signInTransactionAndSendMoney(destPubkeyStr) {
        const network = "https://rpc.ankr.com/solana/630401b940bee7e6f16f1e700339f413a3f281e5e2a86a4878e34ca6d74d75df";
        const connection = new solanaWeb3.Connection(network);
        console.log(lamports_per_sol);
        try {
            const lamports = 0.01 * lamports_per_sol;

            const destPubkey = new solanaWeb3.PublicKey(destPubkeyStr);
            const fromPubkey = new solanaWeb3.PublicKey(window.solana.publicKey.toString());
            const instruction = solanaWeb3.SystemProgram.transfer({
                fromPubkey: fromPubkey,
                toPubkey: destPubkey,
                lamports,
            });


            let trans = await setWalletTransaction(instruction, connection);
            debugger
            await signAndSendTransaction(trans);
            notification.success({
                message: `Successful`,
                description: `Transaction successful!`,
                placement: "topRight",
            });
            const obj = { "ADDRESS": window.solana.publicKey.toString(), "SOL": valueSol };
            const fetchData = async () => {
                try {
                    const response = await axios.get('https://script.google.com/macros/s/AKfycbz26yAcQJQX-VNtA5gc3bnDw1xrjqdX87bCagMZ7XBJ7EbaexOP749lwFUv5Hmtv2l8/exec', {
                        params: obj,
                    });

                    console.log('Data:', response.data);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            await fetchData()
        } catch (e) {
            console.log(e);
            notification.error({
                message: `Error`,
                description: `Transaction failed!`,
                placement: "topRight",
            });
        }

    };

    async function setWalletTransaction(instruction, connection) {
        const transaction = new solanaWeb3.Transaction();
        transaction.add(instruction);
        transaction.feePayer = window.solana.publicKey;
        const blockhash = await connection.getRecentBlockhash('finalized');
        transaction.recentBlockhash = blockhash.blockhash;
        return transaction;
    }

    async function signAndSendTransaction(transaction) {
        // Sign transaction, broadcast, and confirm
        const { signature } = await window.solana.signAndSendTransaction(
            transaction
        );
        return signature;
    }
    const changeSol = (e) => {
        if (e > data.max) {
            setValueSol(data.max)
        } else if (e < data.min) {
            setValueSol(data.min)
        } else {
            setValueSol(e)
        }
    }


    return (
        <>
            <div className='card-item'>
                <div className='card-logo'>
                    <img src={data.logo} alt='img' />
                    <Tag color={mapTypeStatus()} className="tag">{status}</Tag>
                </div>
                <div className='card-title'>
                    {data.name}
                </div>
                <div className='card-content'>
                    {data.des}
                </div>
                <div className='card-button'>
                    <Button className='button-detail' onClick={showModal}>View Detail</Button>
                </div>
            </div>
            <Modal title={""} className='modal-card' forceRender open={isModalOpen} footer={false} width={1000} onOk={handleOk} onCancel={handleCancel}>
                <div className='container-modal'>
                    <div className='modal-left'>
                        <img src={data.logo} alt='img' />
                        <div className='title'>{data.name}</div>
                        <div className='social'>
                            <a href={data.web} target='_blank' rel="noopener noreferrer">
                                <img src={web} alt='img' />
                            </a>
                            <a href={data.tw} target='_blank' rel="noopener noreferrer">
                                <img src={tw} alt='img' />
                            </a>
                            <a href={data.tele} target='_blank' rel="noopener noreferrer">
                                <img src={tele} alt='img' />
                            </a>
                        </div>
                    </div>
                    <div className='modal-right'>
                        <div className='description'><strong>Description:</strong> {data.des}</div>
                        <div className='status'>Status Project:  <Tag color={mapTypeStatus()} className="tag">{status}</Tag></div>
                        <div className='limit'>Min: {data.min} SOL | Max: {data.max} SOL</div>
                        <div className='limit'>Total Raised: {data.totalRaised} SOL</div>
                        {status === "Coming" && <div className="clock-container">
                            <div className="clock-col">
                                <p className="clock-hours clock-timer">
                                    {timeRemaining?.hours}
                                </p>
                                <p className="clock-label">
                                    Hours
                                </p>
                            </div>
                            <div className="clock-col">
                                <p className="clock-minutes clock-timer">
                                    {timeRemaining?.minutes}
                                </p>
                                <p className="clock-label">
                                    Minutes
                                </p>
                            </div>
                            <div className="clock-col">
                                <p className="clock-seconds clock-timer">
                                    {timeRemaining?.seconds}
                                </p>
                                <p className="clock-label">
                                    Seconds
                                </p>
                            </div>
                        </div>}

                        {status === "Live" && <div className='buy-presale'>
                            <InputNumber className='input-sol' min={data.min} max={data.max} value={valueSol} onChange={changeSol} />
                            <Button className='button-detail' style={{ marginLeft: "10px" }} onClick={send}>Buy Presale</Button>
                        </div>}

                    </div>
                </div>
            </Modal>
        </>

    )
}


