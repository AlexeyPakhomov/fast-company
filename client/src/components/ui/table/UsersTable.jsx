import TableBody from './TableBody';
import TableHeader from './TableHeader';
import PropTypes from 'prop-types';

const UsersTable = ({ allUsers, onSort, selectedSort, onChangeLike }) => {
  return (
    <table className="table table-hover">
      <TableHeader onSort={onSort} selectedSort={selectedSort} />

      <TableBody allUsers={allUsers} onChangeLike={onChangeLike} />
    </table>
  );
};

UsersTable.propTypes = {
  allUsers: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onChangeLike: PropTypes.func.isRequired,
};

export default UsersTable;
