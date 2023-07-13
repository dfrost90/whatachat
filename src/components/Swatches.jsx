import { PropTypes } from 'prop-types';
import { SwatchesWrapper } from './wrappers';
import { BsCheck } from 'react-icons/bs';

const Swatches = ({ title, list, current, handleButton }) => {
  return (
    <SwatchesWrapper>
      {title && <div className="row-title">{title}</div>}
      {list.length && (
        <ul className="swatch-list">
          {list.map((item, index) => {
            return (
              <li key={index} className={`swatch-item ${item}`}>
                <div className="swatch-background"></div>
                <button
                  type="button"
                  className="btn-type-3 swatch-button"
                  onClick={() => handleButton(item)}
                >
                  {item === current && <BsCheck />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </SwatchesWrapper>
  );
};

Swatches.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  handleButton: PropTypes.func,
};

export default Swatches;
