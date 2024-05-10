import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { pagination } from '../../utils/pagination';
import SearchStatus from '../ui/SearchStatus';
import SearchPeople from '../ui/SearchPeople';
import SelectProfessionList from '../ui/SelectProfessionList';
import UsersTable from '../ui/table/UsersTable';
import Pagination from '../common/Pagination';
import { useSelector } from 'react-redux';
import { getProfessionsLoadingStatus, getProfessionsState } from '../../store/professions';
import { getCurrentUserId, getUsersState } from '../../store/users';

const UsersListPage = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const users = useSelector(getUsersState());
  const professions = useSelector(getProfessionsState());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [searchQueryUser, setSearchQueryUser] = useState('');
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  function filterUser(data) {
    const filteredUsers = searchQueryUser
      ? data.filter((user) => {
          return user.name.toLowerCase().includes(searchQueryUser.toLowerCase());
        })
      : selectedProf
      ? data.filter((user) => {
          //return user.profession._id === selectedProf._id;
          return JSON.stringify(user.profession) === JSON.stringify(selectedProf._id);
        })
      : data;

    return filteredUsers.filter((user) => user._id !== currentUserId);
  }

  const filteredUsers = filterUser(users);
  let usersCount = filteredUsers.length;
  const usersAfterSorted = _.orderBy(
    filteredUsers,
    [
      (user) => {
        if (sortBy.iter === 'profession') {
          const professionObject = professions.find((profId) => profId._id === user[sortBy.iter]);
          return professionObject.name;
        } else {
          return user[sortBy.iter];
        }
      },
    ],
    [sortBy.order],
  );

  const usersAfterPagination = pagination(usersAfterSorted, currentPage, pageSize);

  function handleLike(e, user) {
    let classBtn = e.target;
    if (!user.bookmark) {
      classBtn.className = 'bi bi-bookmark-fill';
      user.bookmark = true;
    } else {
      classBtn.className = 'bi bi-bookmark';
      user.bookmark = false;
    }
  }

  function handleChangePage(pageIndex) {
    setCurrentPage(pageIndex);
  }
  //console.log('sortBy', sortBy);

  function handleSort(item) {
    //console.log('userList', item);
    setSortBy(item);
  }

  function handleSelectItem(item) {
    setSearchQueryUser('');
    setSelectedProf(item);
  }

  function handleResetProfession() {
    setSelectedProf();
  }

  function handleSearchPeople(inputValue) {
    setSearchQueryUser(inputValue);
    setSelectedProf();
  }

  return (
    <>
      {users ? (
        <div className="d-flex">
          {professions && !professionsLoading && (
            <div className="flex-column flex-shrink-0 p-3">
              <SelectProfessionList
                items={professions}
                selectedItem={selectedProf}
                onItemSelect={handleSelectItem}
                onResetProf={handleResetProfession}
              />
            </div>
          )}
          <div className="flex-column w-100 p-3">
            <SearchStatus length={usersCount} />
            <SearchPeople
              handleSearchPeople={handleSearchPeople}
              searchQueryUser={searchQueryUser}
            />
            <UsersTable
              allUsers={usersAfterPagination}
              onSort={handleSort}
              selectedSort={sortBy}
              onChangeLike={handleLike}
            />
            <Pagination
              itemsCount={usersCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handleChangePage}
            />
          </div>
        </div>
      ) : (
        <h1 className="d-flex align-items-center justify-content-center m-0 h-100">
          Loading UsersListPage
        </h1>
      )}
    </>
  );
};

export default UsersListPage;

//function handleDeleteUser(userId) {
//  //const updatedUsersArr = users.filter((user) => user._id !== userId);
//  console.log(userId);
//}
