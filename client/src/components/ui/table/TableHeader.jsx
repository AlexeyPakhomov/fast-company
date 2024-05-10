import PropTypes from 'prop-types';

function TableHeader({ onSort, selectedSort }) {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества' },
    professions: { path: 'profession', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: { path: 'bookmark', name: 'Избранное' },
  };

  function handleSort(item) {
    if (item === selectedSort.iter) {
      const newOrder = selectedSort.order === 'asc' ? 'desc' : 'asc';
      onSort({ iter: item, order: newOrder });
    } else {
      onSort({ iter: item, order: 'asc' });
    }
  }

  function renderSortArrow(selectedSort, currentPath) {
    if (selectedSort.iter === currentPath) {
      if (selectedSort.order === 'asc') {
        return <i className="bi bi-caret-down-fill"></i>;
      }
      return <i className="bi bi-caret-up-fill"></i>;
    }
    return null;
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            role={columns[column]?.path && 'button'}
            title={columns[column]?.path && 'Нажмите для сортировки'}>
            {columns[column].name}
            {renderSortArrow(selectedSort, columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
};

export default TableHeader;
