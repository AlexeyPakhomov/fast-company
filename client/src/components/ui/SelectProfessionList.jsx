import PropTypes from 'prop-types';
import Button from '../common/Button';

const SelectProfessionList = ({
  items,
  onItemSelect,
  valueProperty,
  contentProperty,
  selectedItem,
  onResetProf,
}) => {
  const arraySort = [...items];
  arraySort.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <>
      <ul className="list-group">
        {arraySort.map((item) => {
          return (
            <li
              className={`list-group-item ${item === selectedItem ? 'active' : ''} `}
              key={item[valueProperty]}
              onClick={() => onItemSelect(item)}
              role="button">
              {item[contentProperty]}
            </li>
          );
        })}
      </ul>
      <Button
        onClick={onResetProf}
        type="button"
        btnText="Очистить фильтр"
        cssBtn="btn btn-warning btn-sm mt-2"
      />
    </>
  );
};
SelectProfessionList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
};

SelectProfessionList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
};

export default SelectProfessionList;
