import React, { useState } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import AddRoom from './AddRoom/AddRoom';
import Room from './Room/Room';


function App() {

  const [roomArr, setRoomArr] = useState([]);
  const [currRoom, setCurrRoom] = useState([]);
  const [items, setItems] = useState([]);

  var listOfItems = [
    ['desk lamp', 'television', 'fireplace', 'computer', 'stereo system', 'air conditioner'],
    ['microwave', 'oven', 'kettle', 'wall lamp', 'television', 'air conditioner'],
    ['water heater', 'wall lamp', 'washing machine', 'drying machine', 'air conditioner']
  ];



  const addroom = (newRoom) => {
    setRoomArr([...roomArr, newRoom]);
  }

  const deleteRoom = (roomId) => {

    let filteredRooms = roomArr.filter(e => e.id !== roomId);
    setRoomArr(filteredRooms);
  }

  const deleteAllRooms = () => {
    setRoomArr([]);
  }

  const CurrRoomId = (currId) => {
    let filteredRoom = roomArr.filter(e => e.id === currId);

    if (filteredRoom[0].type === 'Bedroom') {
      setItems(listOfItems[0]);
    }
    else if (filteredRoom[0].type === 'Kitchen') {
      setItems(listOfItems[1]);
    }
    else {
      setItems(listOfItems[2]);
    }

    setCurrRoom(filteredRoom[0]);
    
  }

  const addEquip = (item, id) => {
    let updatedEquipArr = roomArr.map((room) => {
      if (room.id === id && room.equipments.length < 199) {
        room.equipments = [...room.equipments, { type: item, status: 'red' }];
      }
      return room;
    });
    setRoomArr(updatedEquipArr);
  }



  
  const onOff = (itemIdx, roomId) => {
    let updatedRoomArr = roomArr.map((room) => { 

      if (room.id === roomId) {
        room.equipments.map((item, i) => {
          if (i === itemIdx) {
            if (item.status === "red") {
              item.status = "green"
            }
            else {
              item.status = "red"
            }
          }
          return item;
        });
      }
      return room;
    });

    setRoomArr(updatedRoomArr);
  }

  const deleteItem = (itemIdx, roomId) => {

    let updatedRoomArr = roomArr.map((room) => {

      if(itemIdx === 200){
        room.equipments = [];
      }
      else if (room.id === roomId) {
        let equipArr = room.equipments;
        equipArr.splice(itemIdx,1);

        room.equipments = equipArr;
      }
      else{
        return room;
      }
      return room;
      
    });
    setRoomArr(updatedRoomArr);
  }

  return (
    <div className="App">
      <Router>
        <div className='navbarWrapper'>
          <Link to='/' className='homeSpan'>
            <span >Home</span>
            
          </Link>

          <span className='header'>
            <span className='headerSmart'>Smart</span>House</span>
        </div>


        <Switch>
          <Route exact path='/' component={() => { return <HomePage roomArr={roomArr} CurrRoomId={CurrRoomId} deleteRoom={deleteRoom} deleteAllRooms={deleteAllRooms} /> }} />
          <Route exact path='/addroom' component={() => { return <AddRoom addroom={addroom} /> }} />
          <Route exact path='/room' component={() => { return <Room currRoom={currRoom} addEquip={addEquip} onOff={onOff} items={items} deleteItem={deleteItem} /> }} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;