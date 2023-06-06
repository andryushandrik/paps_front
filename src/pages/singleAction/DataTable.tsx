import { fetchActionStats, fetchFolders } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Table, Panel } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

// const data = [
//   {
//     id: 1,
//     url: 'https://rsuitejs.com',
//     visits: '105,253',
//     unique: '23,361',
//     bounce: '11%'
//   },
//   {
//     id: 2,
//     url: 'https://rsuitejs.com/components/overview/',
//     visits: '103,643',
//     unique: '23,385',
//     bounce: '17%'
//   },
//   {
//     id: 3,
//     url: 'https://rsuitejs.com/components/table/',
//     visits: '140,013',
//     unique: '41,256',
//     bounce: '13%'
//   },
//   {
//     id: 4,
//     url: 'https://rsuitejs.com/components/drawer/',
//     visits: '194,532',
//     unique: '19,038',
//     bounce: '18%'
//   },
//   {
//     id: 5,
//     url: 'https://rsuitejs.com/guide/usage/',
//     visits: '26,353',
//     unique: '1,000',
//     bounce: '20%'
//   },
//   {
//     id: 6,
//     url: 'https://rsuitejs.com/guide/customization/',
//     visits: '11,973',
//     unique: '4,786',
//     bounce: '24%'
//   }
// ];

const DataTable = ({taskId}) => {
  const { data, isFetched} = useQuery({
    queryKey: ['adminData'+ taskId],
    queryFn: () => fetchActionStats(taskId).then(data => data)
  });
  
  if(!data) return (<p>Загрузка...</p> )

  return (
    <Panel className="card" header="Задачи">
      <Table height={300} data={data} rowKey="id">
        <Column flexGrow={1} minWidth={100}>
          <HeaderCell>Название </HeaderCell>
          <Cell dataKey="name" />

        </Column>

        <Column width={130}>
          <HeaderCell>Время</HeaderCell>
          <Cell dataKey="duration" >
            {rowData => (+rowData.duration).toFixed(2) + " ч"} 
          </Cell>
        </Column>

        {/* <Column width={100}>
          <HeaderCell>UNIQUE</HeaderCell>
          <Cell dataKey="unique" />
        </Column>

        <Column width={130}>
          <HeaderCell>BOUNCE RATE</HeaderCell>
          <Cell dataKey="bounce" />
        </Column> */}
      </Table>
    </Panel>
  );
};

export default DataTable;
