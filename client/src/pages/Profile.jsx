import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5050/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:5050/api/auth/user', profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {editing ? (
        <form onSubmit={handleEdit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {profile.typeOfUser === 'Founder' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          {profile.typeOfUser === 'Investor' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mentorshipFee">
                Mentorship Fee
              </label>
              <input
                type="number"
                id="mentorshipFee"
                value={profile.mentorshipFee}
                onChange={(e) => setProfile({ ...profile, mentorshipFee: Number(e.target.value) })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.fullName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>User Type:</strong> {profile.typeOfUser}</p>
          {profile.typeOfUser === 'Founder' && <p><strong>Company:</strong> {profile.companyName}</p>}
          {profile.typeOfUser === 'Investor' && <p><strong>Mentorship Fee:</strong> ${profile.mentorshipFee}</p>}
          <button onClick={() => setEditing(true)} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
