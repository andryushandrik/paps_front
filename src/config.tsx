import React from 'react';
import { Icon } from '@rsuite/icons';
import { MdDashboard } from 'react-icons/md';
import UserBadgeIcon from '@rsuite/icons/UserBadge';

export const appNavs = [
  {
    eventKey: 'folders',
    icon: <Icon as={MdDashboard} />,
    title: 'Папки',
    to: '/folders'
  },
  {
    eventKey: 'sign-in',
    icon: <Icon as={UserBadgeIcon} />,
    title: 'Вход',
    to: '/sign-in'
  },
  // {
  //   eventKey: 'calendar',
  //   icon: <Icon as={VscCalendar} />,
  //   title: 'Calendar',
  //   to: '/calendar'
  // },
  // {
  //   eventKey: 'tables',
  //   icon: <Icon as={VscTable} />,
  //   title: 'Tables',
  //   to: '/table-members',
  //   children: [
  //     {
  //       eventKey: 'members',
  //       title: 'Members',
  //       to: '/table-members'
  //     },
  //     {
  //       eventKey: 'virtualized',
  //       title: 'Virtualized Table',
  //       to: '/table-virtualized'
  //     }
  //   ]
  // },
  // {
  //   eventKey: 'forms',
  //   icon: <Icon as={MdModeEditOutline} />,
  //   title: 'Forms',
  //   to: '/form-basic',
  //   children: [
  //     {
  //       eventKey: 'form-basic',
  //       title: 'Basic',
  //       to: '/form-basic'
  //     },
  //     {
  //       eventKey: 'form-wizard',
  //       title: 'Wizard',
  //       to: '/form-wizard'
  //     }
  //   ]
  // },
  // {
  //   eventKey: 'authentication',
  //   title: 'Authentication',
  //   icon: <Icon as={MdFingerprint} />,
  //   children: [
  //     {
  //       eventKey: 'sign-in',
  //       title: 'Sign In',
  //       to: '/sign-in'
  //     },

  //     {
  //       eventKey: 'sign-up',
  //       title: 'Sign Up',
  //       to: '/sign-up'
  //     },
  //     {
  //       eventKey: 'error403',
  //       title: 'Error 403',
  //       to: '/error-403'
  //     },
  //     {
  //       eventKey: 'error404',
  //       title: 'Error 404',
  //       to: '/error-404'
  //     },
  //     {
  //       eventKey: 'error500',
  //       title: 'Error 500',
  //       to: '/error-500'
  //     },
  //     {
  //       eventKey: 'error503',
  //       title: 'Error 503',
  //       to: '/error-503'
  //     }
  //   ]
  // },

  // {
  //   eventKey: 'components',
  //   title: 'Components',
  //   icon: <CubesIcon />,
  //   href: 'https://rsuitejs.com/components/overview/',
  //   target: '_blank'
  // }
];
