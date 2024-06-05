import React, { useEffect, useState } from "react";
import './style.scss';
import axios from "axios";
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const { backend_url } = config;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [area, setArea] = useState('');
  const [votes, setVotes] = useState('');
  const [tvotes, setTvotes] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, party, area, votes, tvotes };
      const { data } = await axios.post(`${backend_url}/user`, newUser);
      setUsers([...users, data]);
      setName('');
      setParty('');
      setArea('');
      setVotes('');
      setTvotes('');
      toast.success("Candidate added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add candidate");
    }
  }

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${backend_url}/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success("Candidate deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete candidate");
    }
  }


  return (
    <div className="Users-container">
      <div className="heading">
        <h2>Election Management System</h2>
      </div>

      <div className="add-user">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name of Candidate</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <br />
          <label htmlFor="party">Party</label>
          <input 
            type="text" 
            id="party" 
            value={party} 
            onChange={(e) => setParty(e.target.value)} 
          />
          <br />
          <label htmlFor="area">Area</label>
          <input 
            type="text" 
            id="area" 
            value={area} 
            onChange={(e) => setArea(e.target.value)} 
          />
          <br />
          <label htmlFor="area">Votes given</label>
          <input 
            type="text" 
            id="votes" 
            value={votes} 
            onChange={(e) => setVotes(e.target.value)} 
          />
          <br />
          <label htmlFor="area">Total votes</label>
          <input 
            type="text" 
            id="tvotes" 
            value={tvotes} 
            onChange={(e) => setTvotes(e.target.value)} 
          />
          <br />
          <button type="submit">Add User</button>
        </form>
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
              <div className="col">{user.votes}</div>
              <button className="delete" onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Users;
