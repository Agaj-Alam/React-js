import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  //using fetch native js

  // useEffect(()=>{
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response=>response.json())
  //   .then(data=>setUsers(data))
  //   .catch(err=>console.error(err));
  // },[])


  //Using axios – Most Popular
  // useEffect(()=>{
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //   .then(response=>setUsers(response.data))
  //   .catch(err=>console.error(err))
  // },[])


  //Using async/await Syntax
  useEffect(()=>{
    const fetchdata=async ()=>{
      try{
        const res=await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(res.data)
      }catch(err){
        console.error(err)
      }
    };
    fetchdata();
  },[])

  return (
    <div>
      <h2>Users List</h2>
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        users.map(user => (
          <div key={user.id}>{user.name}</div>
        ))
      )}
    </div>
  );
};

export default UserList;
