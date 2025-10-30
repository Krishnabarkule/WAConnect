
import React, {useState} from 'react';
import axios from 'axios';

export default function LoginPage(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [msg,setMsg]=useState('');

  async function login(e){
    e.preventDefault();
    try {
      const res = await axios.post((process.env.REACT_APP_API_URL || '') + '/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard';
    } catch(e){
      setMsg(e.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 mb-4">WAConnect</h1>
        <p className="text-sm text-gray-600 mb-6">WhatsApp-style bulk messaging — demo</p>
        <form onSubmit={login}>
          <input className="w-full p-3 mb-3 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full p-3 mb-3 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full p-3 bg-green-600 text-white rounded">Login</button>
        </form>
        {msg && <p className="text-red-500 mt-3">{msg}</p>}
      </div>
    </div>
  );
}
