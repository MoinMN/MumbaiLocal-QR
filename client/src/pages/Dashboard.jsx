import React, { useState } from 'react'
import Navbar from '../components/admin/Navbar'
import Approved from '../components/admin/Approved';
import Pending from '../components/admin/Pending';
import AddNew from '../components/admin/AddNew';

const Dashboard = () => {
  const [section, setSection] = useState('approved');

  return (
    <>
      <div className="bg-purple-100 min-h-screen">
        <Navbar setSection={setSection} />

        {section === 'approved'
          ? <Approved />
          : section === 'pending'
            ? <Pending />
            : section === 'add-new'
              ? <AddNew />
              : ""
        }

      </div>
    </>
  )
}

export default Dashboard
