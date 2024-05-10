import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
  function changeText(length) {
    switch (true) {
      case length === 0:
        return 'Никто с тобой не тусанет!';
      case length === 2:
      case length === 3:
      case length === 4:
        return `${length} человека тусанут с тобой сегодня`;

      default:
        return `${length} человек тусанет с тобой сегодня`;
    }
  }

  return (
    <>
      {length === 0 ? (
        <h1 className="fs-4 badge bg-danger w-100">{changeText(length)}</h1>
      ) : (
        <h1 className="fs-4 badge bg-primary w-100">{changeText(length)}</h1>
      )}
    </>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number,
};

export default SearchStatus;
