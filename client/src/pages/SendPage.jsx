
import React, {useState} from 'react';
import axios from 'axios';

export default function SendPage(){
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('Hi {name}, hello from WAConnect');
  const token = localStorage.getItem('token');

  async function upload(e){
    e.preventDefault();
    if(!file) return alert('Select CSV');
    const fd = new FormData();
    fd.append('csv', file);
    fd.append('message', message);
    const res = await axios.post((process.env.REACT_APP_API_URL || '') + '/api/send/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + token }
    });
    alert('Job submitted. Summary: ' + JSON.stringify(res.data.summary));
    window.location.href = '/dashboard';
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Send Messages</h3>
        <form onSubmit={upload}>
          <input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])} className="mb-3" />
          <textarea className="w-full border p-3 mb-3" rows="4" value={message} onChange={e=>setMessage(e.target.value)} />
          <button className="px-4 py-2 bg-green-600 text-white rounded">Send (simulate)</button>
        </form>
      </div>
    </div>
  );
}
