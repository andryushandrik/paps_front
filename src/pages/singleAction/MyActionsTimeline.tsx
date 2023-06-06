import { fetchActions } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Loader, Timeline } from 'rsuite';
const MyActionsTimeline = props => {

  // state to store time
    useEffect(() => {
      refetch()
    }, [props.update]);

  const { isLoading, error, data, isFetching, refetch } = useQuery({
    queryKey: ['myActionsInTask' + props.taskId],
    queryFn: () => fetchActions(3, props.taskId).then(data => data)
  });
  console.log(21);

  if (isLoading || isFetching) return <Loader></Loader>;
  if (error)
    return (
      <>
        <p>Произошла ошибка :(</p>
      </>
    );

  return (
    <Timeline style={{overflowY: "scroll", maxHeight:"300px"}} {...{isItemActive: Timeline.ACTIVE_FIRST}}>
      {data.reverse().map(action => (
        <Timeline.Item key={action.id}>
          {new Date(action.startTime).toLocaleString('ru-RU')} ПО{' '}
          {action.endTime ? new Date(action.endTime).toLocaleString('ru-RU') : 'Не завершено'}{' '}
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default MyActionsTimeline;
