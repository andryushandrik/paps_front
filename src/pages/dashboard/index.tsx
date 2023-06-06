import React from 'react';
import { Panel } from 'rsuite';
import Dashboard from './Dashboard';
import Copyright from '@/components/Copyright';

const Page = () => {
  return (
    <Panel header={<h3 className="title">Сводка</h3>}>
      {/* <PageToolbar /> */}
      <Dashboard />
      <Copyright />
    </Panel>
  );
};

export default Page;
