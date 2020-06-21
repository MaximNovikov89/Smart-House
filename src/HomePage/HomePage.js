import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

export default function HomePage(props) {

    const [roomArr] = useState(props.roomArr);

    const handleEnterRoom = (e) => {
        props.CurrRoomId(e.target.id);
    }

    const handleDeleteRoom = (e) => {
        props.deleteRoom(e.target.id);
    }

    const handleDeleteAllRooms = () => {
        props.deleteAllRooms();
    }

    return (
        <div className='homePage'>
            <Link to='/addroom' style={{ textDecoration: 'none' }} className='linkAddRoom'>
                <span className='addRoomBtn'>Add Room</span>
            </Link>
            <button className={props.roomArr.length > 0 ? 'addRoomBtn deleteBtn' : 'hiddenBtn'}
                onClick={handleDeleteAllRooms}>Delete All Rooms</button>

            <div className='roomsContainer'>
                {roomArr.map((e) => (
                    <div className={`singleRoom ${e.type}`} key={e.id}>

                        <h3 className='roomName'>{e.name}</h3>
                        <div className='roomDelete' id={e.id} onClick={handleDeleteRoom}>X</div>


                        <Link to='/room' >
                            <button
                                id={e.id}
                                onClick={handleEnterRoom}
                                style={{ backgroundColor: e.color }}
                                className='enterBtn'>Enter</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
