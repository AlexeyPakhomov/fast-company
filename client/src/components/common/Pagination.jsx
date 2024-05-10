import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesNumber = Math.ceil(itemsCount / pageSize);

  if (pagesNumber === 1) return null;

  function createArrPages(pagesNumber) {
    const pagesNumberArr = [];
    for (let i = 1; i <= pagesNumber; i++) {
      pagesNumberArr.push(i);
    }

    return pagesNumberArr;
  }

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {createArrPages(pagesNumber).map((page) => {
          return (
            <li
              className={`page-item + ${page === currentPage ? 'active' : ''}`}
              key={'page:' + page}>
              <button
                onClick={() => onPageChange(page)}
                className="page-link">
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
