import React, { useState } from 'react';
import uuid from 'react-uuid';
import './AddRoom.css'
import { Link } from 'react-router-dom';

export default function AddRoom(props) {

    const [newRoom, setNewRoom] = useState(
        {
            name: '',
            type: '',
            color: '',
            equipments: [],
            id: uuid()
        });

    const handleUpdateRoom = (e) => {

        setNewRoom({ ...newRoom, [e.target.name]: e.target.value })
    }
    const handleAddRoom = () => {

        newRoom.name.length >= 1
            ? props.addroom(newRoom)
            : alert('Room Name must have at least 1 character')
    }

    return (
        <div className='addRoomForm'>
            <div className='nameHeader'>Room Name:</div>
            <input
                className='roomInputName'
                type='text'
                name='name'
                placeholder='Name...'
                onChange={handleUpdateRoom}></input>

            <div className='typeHeader'>Type:</div>

            <select
                className='selectInput'
                onChange={handleUpdateRoom}
                name='type'>
                <option defaultValue>Choose Room Type...</option>
                <option value='Bedroom'>Bedroom</option>
                <option value='Bathroom'>Bathroom</option>
                <option value='Kitchen'>Kitchen</option>
            </select>

            <div className='colorHeader'>Pick a Color:</div>
            <input
                className='colorInput'
                type='color'
                name='color'
                onChange={handleUpdateRoom}></input>

            <Link to='/' className='addRoomLink'>
                <button onClick={handleAddRoom} className='addBtn'>Add Room</button>
            </Link>
        </div>
    )
}
