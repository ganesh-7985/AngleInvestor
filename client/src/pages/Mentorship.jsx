// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Mentorship = () => {
//   const [mentors, setMentors] = useState([]);
//   const [userType, setUserType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRes = await axios.get('/api/auth/user');
//         setUserType(userRes.data.typeOfUser);
//         if (userRes.data.typeOfUser === 'Founder') {
//           const mentorsRes = await axios.get('/api/mentorship/mentors');
//           setMentors(mentorsRes.data);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handlePurchaseMentorship = async (mentorId) => {
//     try {
//       await axios.post(`/api/mentorship/purchase/${mentorId}`);
//       alert('Mentorship purchased successfully!');
//     } catch (error) {
//       console.error('Error purchasing mentorship:', error);
//       alert('Failed to purchase mentorship. Please try again.');
//     }
//   };

//   const filteredMentors = mentors.filter(mentor =>
//     mentor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (userType === 'Investor') {
//     return (
//       <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold mb-6">Mentorship</h1>
//         <p>As an investor, you can offer mentorship to founders. Set your mentorship fee in your profile.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Available Mentors</h1>
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search Mentors"
//           className="w-full p-2 border rounded"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//         {filteredMentors.map((mentor) => (
//           <div key={mentor._id} className="bg-white p-4 rounded-lg shadow">
//             <img
//               src={mentor.profilePicture || "/placeholder-avatar.jpg"}
//               alt={mentor.fullName}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//             <h2 className="text-xl font-semibold mb-2">{mentor.fullName}</h2>
//             <p className="text-gray-600 mb-2">12 Mutual friends</p>
//             <p className="font-bold mb-4">${mentor.mentorshipFee}</p>
//             <button
//               onClick={() => handlePurchaseMentorship(mentor._id)}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Add Friend
//             </button>
//             <button className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//               Add Friend
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Mentorship;


import React, { useState } from 'react';

// Dummy data for mentors
const dummyMentors = [
  {
    _id: '1',
    fullName: 'Rose J. Henry',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    mentorshipFee: 150,
    mutualFriends: 12
  },
  {
    _id: '2',
    fullName: 'Kai Caudle',
    profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    mentorshipFee: 200,
    mutualFriends: 12
  },
  {
    _id: '3',
    fullName: 'Jane Cooper',
    profilePicture: 'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    mentorshipFee: 180,
    mutualFriends: 12
  },
  {
    _id: '4',
    fullName: 'Wade Warren',
    profilePicture: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    mentorshipFee: 220,
    mutualFriends: 12
  },
  {
    _id: '5',
    fullName: 'Leslie Alexander',
    profilePicture: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    mentorshipFee: 190,
    mutualFriends: 12
  }
];

const Mentorship = () => {
  const [mentors, setMentors] = useState(dummyMentors);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePurchaseMentorship = (mentorId) => {
    alert(`Mentorship purchased successfully for mentor with ID: ${mentorId}`);
  };

  const filteredMentors = mentors.filter(mentor =>
    mentor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">People you may know</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Friends"
            className="w-64 p-2 pl-8 border rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredMentors.map((mentor) => (
          <div key={mentor._id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={mentor.profilePicture}
              alt={mentor.fullName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{mentor.fullName}</h2>
            <p className="text-gray-600 mb-2">{mentor.mutualFriends} Mutual friends</p>
            <button
              onClick={() => handlePurchaseMentorship(mentor._id)}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mb-2"
            >
              Add Friend
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentorship;