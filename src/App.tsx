import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Frame from './components/Frame';
import DashboardPage from './pages/dashboard';
import Error404Page from './pages/authentication/404';
import Error403Page from './pages/authentication/403';
import Error500Page from './pages/authentication/500';
import Error503Page from './pages/authentication/503';

import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import MembersPage from './pages/tables/members';
import FoldersPage from './pages/tables/folders';
import SingleAction from './pages/singleAction';

import TasksPage from './pages/tables/tasks';
import VirtualizedTablePage from './pages/tables/virtualized';
import FormBasicPage from './pages/forms/basic';
import FormWizardPage from './pages/forms/wizard';
import CalendarPage from './pages/calendar';
import { appNavs } from './config';
import { useQuery } from '@tanstack/react-query';

import { check, refresh } from './http/api';
import { setUser } from './data/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { error } from 'console';
import { first } from 'lodash';
import { RootState } from './data/store';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const checkQuery = useQuery({
    onSuccess: data => {
      console.log(data);
      const isAdmin = data.roles.includes('ADMIN');
      dispatch(setUser({ isAdmin, name: data.name }));
      if (!isAdmin) navigate('/folders');
    },
    onError: error => {
      console.error(error);
      // refreshQuery.refetch();
    },
    queryKey: ['check'],
    queryFn: () => check(),
    enabled: true
  });

  useEffect(() => {
    if (!(user.isLoggedIn || localStorage.getItem('token'))) {
      navigate('/sign-in');
    }
  }, [user]);

  // const refreshQuery = useQuery({
  //   onSuccess: data => {
  //     console.log(data);
  //     const isAdmin = data.user.roles.includes('ADMIN');
  //     dispatch(setUser({ isAdmin, name: data.user.name }));
  //     if (!isAdmin) navigate('/folders');
  //   },
  //   queryKey: ['refresh'],
  //   queryFn: () => refresh(),
  //   enabled: false
  // });

  return (
    <Routes>
      <Route path="/" element={<Frame navs={appNavs} />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="table-members" element={<MembersPage />} />
        <Route path="action" element={<SingleAction />} />
        <Route path="folders/:idFolder" element={<TasksPage />} />
        <Route path="folders/:idFolder/tasks/:idTask" element={<SingleAction />} />

        <Route path="folders" element={<FoldersPage />} />

        <Route path="table-virtualized" element={<VirtualizedTablePage />} />
        <Route path="error-404" element={<Error404Page />} />
        <Route path="error-403" element={<Error403Page />} />
        <Route path="error-500" element={<Error500Page />} />
        <Route path="error-503" element={<Error503Page />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="form-basic" element={<FormBasicPage />} />
        <Route path="form-wizard" element={<FormWizardPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};

export default App;
