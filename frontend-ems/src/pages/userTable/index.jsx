import React, { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios';
import config from '../../config';
const { backend_url } = config;


const UserTable = () => {

  const [users, setUsers] = useState([]);


    const getUsers = async () => {
        try {
          const { data } = await axios.get(`${backend_url}/user`);
          setUsers(data);
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        getUsers();
      }, []);

  return (
    <div className='UserTable-container'>
        <div className="head">
            <h2>List of Candidates</h2>
        </div>
      <div className="show-user">
        <div className="user-head">
          <h3>Name</h3>
          <h3>Party</h3>
          <h3>Area</h3>
          <h3>Votes given</h3>
        </div>
        <div className="table">
          {users.map((user, i) => (
            <div className="row" key={i}>
              <div className="col">{user.name}</div>
              <div className="col">{user.party}</div>
              <div className="col">{user.area}</div>
              <div className="col">10</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserTable
