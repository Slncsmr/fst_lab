import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null); // State for editing user

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission to add or update a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingUser) {
        // Update existing user
        const res = await axios.put(`http://localhost:5000/users/${editingUser._id}`, {
          name,
          email,
          password,
        });
        setUsers(users.map(user => (user._id === editingUser._id ? res.data : user)));
        setEditingUser(null);
      } else {
        // Add new user
        const res = await axios.post('http://localhost:5000/users', {
          name,
          email,
          password,
        });
        setUsers((prevUsers) => [...prevUsers, res.data]);
      }

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Error adding/updating user:', err);
      setError('Error adding/updating user');
    }
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Error deleting user');
    }
  };

  // Handle edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserList;
