import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfessionsById, getProfessionsLoadingStatus } from '../../store/professions';

const Profession = ({ id }) => {
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  const prof = useSelector(getProfessionsById(id));

  return <>{!professionsLoading ? prof.name : 'Loading Profession'}</>;
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
