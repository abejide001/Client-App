import React from 'react';
import Client from '../../components/clients/Client';
import Sidebar from './Sidebar';
const Dashboard = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-10 mt-2">
          <Client />
        </div>
        <div className="col-md-2 mt-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
