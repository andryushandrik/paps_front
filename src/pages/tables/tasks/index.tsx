import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import DataTable from './DataTable';
import { useParams } from 'react-router-dom';

const Page = () => {
  console.log(1);

  let { idFolder } = useParams();

  const folderId = Number(idFolder) || 1;

  return (
    <Panel
      header={
        <>
          <h3 className="title">Папки</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item href="/folders">Папки</Breadcrumb.Item>
            <Breadcrumb.Item>{folderId}</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <DataTable folderId={folderId} />
    </Panel>
  );
};

export default Page;
