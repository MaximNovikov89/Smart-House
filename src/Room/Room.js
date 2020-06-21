import React, { useState } from 'react';
import uuid from 'react-uuid';
import './Room.css';

export default function Room(props) {

    const [room] = useState(props.currRoom);
    const [item, setItem] = useState('');


    const handleOnOff = (i) => {
        let inx = parseInt(i.target.value);

        props.onOff(inx, room.id);
    }

    const handleAddEquip = () => {
        if (item !=='') {
            props.addEquip(item, room.id);
        }
    }

    const handleDeleteItem = (i) => {
        let inx = parseInt(i.target.value);

        props.deleteItem(inx, room.id);
    }



    return (
        <div className='roomContainer'>

            <div className='card'>
                <div className='addEquipHeader'><span>Add </span>Equipment</div>

                <select className='roomSelect'
                    onChange={e => setItem(e.target.value)}>
                    <option hidden>{item === ''? 'Choose...' : item}</option>

                    {props.items.map(e =>(
                        <option key = {uuid()} className='selecOpt' name= {e}>{e}</option>
                    ))};
                </select>
                <button
                    onClick={handleAddEquip}
                    className='addEquipBtn'>Add</button>
                    <button
                    onClick={handleDeleteItem}
                    value={'200'}
                    className={room.equipments.length > 0 ? 'addEquipBtn dltEquip' : 'dltBtnHidden'}>Clear Room</button>
            </div>
                <div className = 'itemCardContainer'>
                    {room.equipments.map((e, i) => (
                        <div key={uuid()} className={e.status === 'red' ? 'itemCard-off' : 'itemCard-on'}>
                            {e.type}
                            <button className='itemBtn powerBtn' value={i} onClick={handleOnOff}>👏</button>
                            <button className='itemBtn deleteItemBtn' value={i} onClick={handleDeleteItem}><span role = 'img' aria-label="trash">🗑️</span></button>
                        </div>
                    ))}
                </div>
        </div>

    )
}
