import React from 'react';
import { Row, Col, Panel, ButtonGroup, Button } from 'rsuite';
import * as images from '@/images/charts';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DataTable from './DataTable';
import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '@/http/api';

const Dashboard = () => {
  const DashboardQuery = useQuery({
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
      // refreshQuery.refetch();
    },
    queryKey: ['dashboard'],
    queryFn: () => getDashboard()
  });

  const barChartData = [
    {
      name: 'Часы',
      data: DashboardQuery?.data?.byDays?.durations || ['Загрузка']
    }
  ];
  return (
    <>
      <Row gutter={30} className="dashboard-header">
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-red">
            <img className="chart-img" src={images.PVIcon} />
            <div className="title">Часов </div>
            <div className="value">{DashboardQuery?.data?.total || '...'}</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-green">
            <img className="chart-img" src={images.VVICon} />
            <div className="title">Visits </div>
            <div className="value">251,901</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-blue">
            <img className="chart-img" src={images.UVIcon} />
            <div className="title">Unique Visitors</div>
            <div className="value">25,135</div>
          </Panel>
        </Col>
      </Row>

      <Row gutter={30}>
        <Col xs={16}>
          <BarChart
            title="Итоги дней"
            // actions={
            //   <ButtonGroup>
            //     <Button active>Day</Button>
            //     <Button>Week</Button>
            //     <Button>Month</Button>
            //   </ButtonGroup>
            // }
            data={barChartData }
            type="bar"
            
            labels={DashboardQuery?.data?.byDays?.labels || ['Загрузка']}
          />
        </Col>
        <Col xs={8}>
          <PieChart
            title="Сотрудники"
            data={DashboardQuery?.data?.byUsers?.durations || ['Загрузка']}
            type="donut"
            labels={DashboardQuery?.data?.byUsers?.labels || ['Загрузка']}

          />
        </Col>
      </Row>
      <Row gutter={30}>
        <Col xs={16}>
          <DataTable data={DashboardQuery?.data?.byTasks}/>
        </Col>
        <Col xs={8}>
          <PieChart
            title="Проекты"
            data={DashboardQuery?.data?.byFolders?.durations || ['Загрузка']}
            type="pie"
            labels={DashboardQuery?.data?.byFolders?.labels || ['Загрузка']}
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
