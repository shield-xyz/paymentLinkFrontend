// src/app/(dashboard)/profile/page.jsx

'use client';

import { useEffect, useState } from 'react';

import { useToken } from '../../../providers/AuthContext';
import { getUser } from '../../../services/loginServices';

const ProfilePage = () => {
  const { token } = useToken();
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    company: '',
    logo: '',
    password: '',
  });

  useEffect(() => {
    if (token) {
      getUser(token).then((res) => {
        setFormData(res.response);
      });
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="pt-2 text-center">
      <h2>Profile Page</h2>
      <form className="col-md-4 col-md-offset-4 section-title row">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_name">Name:</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company Name:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
