import PropTypes from 'prop-types';
import Qualitie from '../common/Qualitie';

const QualitiesCard = ({ qualities }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          {qualities.map((q) => {
            return <Qualitie key={q} id={q} />;
          })}
        </p>
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesCard;
