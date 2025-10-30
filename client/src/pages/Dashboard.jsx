
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('user')||'{}');
  const token = localStorage.getItem('token');

  const [stats, setStats] = useState({sent:0});

  useEffect(()=>{
    // placeholder: fetch stats from server
    setStats({ sent: 123, daily: [5,10,3,7,2] });
  },[]);

  function goSend(){ window.location.href = '/send' }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Welcome, {user.name || 'User'}</h2>
        <p className="text-sm text-gray-600">Total messages sent: <strong>{stats.sent}</strong></p>
        <div className="mt-6">
          <button onClick={goSend} className="px-4 py-2 bg-green-600 text-white rounded">Send Messages</button>
        </div>
      </div>
    </div>
  );
}
