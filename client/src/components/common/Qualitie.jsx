import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getQualitiesById, getQualitiesLoadingStatus } from '../../store/qualities';

const Qualitie = ({ id }) => {
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const quality = useSelector(getQualitiesById(id));

  return (
    <>
      {!isLoading ? (
        <span id={quality.id} className={`badge m-1 bg-${quality.color}`}>
          {quality.name}
        </span>
      ) : (
        'Loading Qualitie'
      )}
    </>
  );
};

Qualitie.propTypes = {
  id: PropTypes.string,
};

export default Qualitie;
