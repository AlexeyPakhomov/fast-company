import React from 'react';
import User from './User';
import PropTypes from 'prop-types';

const TableBody = ({ allUsers, onChangeLike }) => {
  return (
    <tbody>
      {allUsers.map((user) => {
        return <User key={user._id} user={user} onChangeLike={onChangeLike} />;
      })}
    </tbody>
  );
};
TableBody.propTypes = {
  allUsers: PropTypes.array.isRequired,
  onChangeLike: PropTypes.func.isRequired,
};
export default TableBody;
