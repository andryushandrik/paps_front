import React, { useState } from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import Copyright from '@/components/Copyright';
import { useParams } from 'react-router-dom';
import MyActionsTimeline from './MyActionsTimeline';
import { TimeBlock } from './TimeBlock';
import DataTable from './DataTable';
import { RootState } from '@/data/store';
import { useSelector } from 'react-redux';

const Page = () => {
  const [update, setUpdate] = useState(false);
  let { idTask, idFolder } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const taskId = Number(idTask) || 1,
    folderId = Number(idFolder) || 1;

  return (
    <Panel
      header={
        <>
          <h3 className="title">Папки</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item href="/folders">Папки</Breadcrumb.Item>
            <Breadcrumb.Item>{folderId}</Breadcrumb.Item>
            <Breadcrumb.Item>Задача №{taskId}</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      {user.isAdmin ? (
        <DataTable taskId={taskId}></DataTable>
      ) : (
        <div style={{ background: '#fff' }}>
          <TimeBlock taskId={taskId} updateParent={setUpdate} />
          <div style={{ padding: '2em' }}>
            <MyActionsTimeline taskId={taskId} update={update} />
          </div>
        </div>
      )}

      <Copyright />
    </Panel>
  );
};

export default Page;
