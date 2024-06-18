'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { showAlert } from '../../../services/tronLinkService';
import DashboardLayout from '../layout';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUser, updateUser } from '@/features/auth/actions/login';
import { useToken } from '@/providers/AuthContext';

const Profile = () => {
  console.log('Profile component rendered');

  const { token } = useToken();
  console.log('Token from useToken:', token);

  const router = useRouter();
  console.log('Router object:', router);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    company: '',
    logo: '',
    password: '',
  });

  useEffect(() => {
    console.log('useEffect triggered with token:', token);
    if (token) {
      getUser(token).then((res) => {
        console.log('getUser response:', res);
        setFormData(res.response);
      });
    }
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData2 = new FormData();

    formData2.append('user_name', formData.user_name);
    if (formData.company) formData2.append('company', formData.company);
    if (formData.password) formData2.append('password', formData.password);
    if (image) formData2.append('logo', image);

    try {
      const data = await updateUser(token, formData2);
      console.log('updateUser response:', data);
      if (data.status === 'success') {
        showAlert('Profile updated');
      } else {
        setError(data.response);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile');
    }
  };

  return (
    <DashboardLayout>
      <div className="pt-2 text-center">
        <h2>Update Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="col-md-4 col-md-offset-4 section-title row"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Input
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
            <Input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo</label>
            <Input
              type="file"
              id="logo"
              name="logo"
              onChange={handleImageChange}
              accept="image/*"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="company">Company Name:</label>
            <Input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Update</Button>
          {error && (
            <Alert type="danger">
              <strong>{error}</strong>
            </Alert>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
