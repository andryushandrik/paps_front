import React, { useState } from 'react';
import { Table, Button, DOMHelper, Stack } from 'rsuite';
import DrawerView from './DrawerView';
import { ButtonCell, DescrCell } from './Cells';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '@/http/api';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/data/store';
import { useSelector } from 'react-redux';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DataTable = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const folderId = props.folderId;

  let checked = false;
  let indeterminate = false;

  const { isLoading, error, data, isFetching, refetch } = useQuery({
    queryKey: ['repoDataTasks'],
    queryFn: () => fetchTasks({ folderId }).then(data => data)
  });
  console.log(data);

  if (checkedKeys.length === data?.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (_value, checked) => {
    const keys = checked ? data.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
    setCheckedKeys(keys);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    const filtered = data.filter(item => {
      if (!item.name.includes(searchKeyword)) {
        return false;
      }

      if (rating && item.rating !== rating) {
        return false;
      }

      return true;
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
        let x: any = a[sortColumn];
        let y: any = b[sortColumn];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filtered;
  };

  console.log('tasks');

  return (
    <>
      <Stack className="table-toolbar" justifyContent="space-between">
        {user.isAdmin ? (
          <Button appearance="primary" onClick={() => setShowDrawer(true)}>
            Создать
          </Button>
        ) : (
          ''
        )}
        <Button appearance="primary" onClick={() => setShowDrawer(true)}>
          Создать
        </Button>

        {/* <Stack spacing={6}>
          <SelectPicker
            label="Rating"
            data={data}
            searchable={false}
            // value={rating}
            // onChange={setRating}
          />
          <InputGroup inside>
            <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack> */}
      </Stack>

      <Table
        height={Math.max(getHeight(window) - 200, 400)}
        data={data}
        sortColumn={sortColumn}
        sortType={sortType}
        // onSortColumn={handleSortColumn}
      >
        <Column width={50} align="center" fixed>
          <HeaderCell>№</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        {/* <Column width={50} fixed>
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
              />
            </div>
          </HeaderCell>
          <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
        </Column> */}

        {/* <Column width={80} align="center">
          <HeaderCell>Avatar</HeaderCell>
          <ImageCell dataKey="avatar" />
        </Column> */}

        <Column minWidth={60} flexGrow={1} sortable>
          <HeaderCell>Название</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column minWidth={100} flexGrow={1} sortable>
          <HeaderCell>Описание</HeaderCell>
          <DescrCell dataKey="description" />
        </Column>

        {/* <Column width={230} sortable>
          <HeaderCell>Дата создания</HeaderCell>
          <Cell style={{ padding: '10px 0' }} dataKey="progress">
            {rowData => <Progress percent={rowData.progress} showInfo={false} />}
          </Cell>
        </Column> */}

        <Column width={200} sortable>
          <HeaderCell>Дата создания</HeaderCell>
          <Cell dataKey="createdAt">
            {rowData => new Date(rowData.createdAt).toLocaleString('ru-RU')}
          </Cell>
        </Column>

        <Column width={200} sortable>
          <HeaderCell>Изменено</HeaderCell>
          <Cell dataKey="updatedAt">
            {rowData => new Date(rowData.createdAt).toLocaleString('ru-RU')}
          </Cell>
        </Column>

        {/* <Column width={100} sortable>
          <HeaderCell>Rating</HeaderCell>
          <Cell dataKey="rating">
            {rowData =>
              Array.from({ length: rowData.rating }).map((_, i) => <span key={i}>⭐️</span>)
            }
          </Cell>
        </Column>

        <Column width={100} sortable>
          <HeaderCell>Income</HeaderCell>
          <Cell dataKey="amount">{rowData => `$${rowData.amount}`}</Cell>
        </Column>

        <Column width={300}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
*/}
        <Column width={120}>
          <HeaderCell>Открыть</HeaderCell>
          <Cell style={{ padding: '6px' }}>
            {rowData => (
              <Button appearance="primary" onClick={() => navigate(`tasks/${rowData.id}`)}>
                Открыть
              </Button>
            )}
          </Cell>
        </Column>
      </Table>

      <DrawerView
        open={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          refetch();
        }}
      />
    </>
  );
};

export default DataTable;
