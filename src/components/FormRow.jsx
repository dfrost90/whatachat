import { PropTypes } from 'prop-types';
import FormRowWrapper from './wrappers/FormRowWrapper';

const FormRow = (props) => {
  const {
    label,
    type,
    id,
    name,
    value,
    placeholder,
    required,
    handleChange,
    checked,
    maxLength,
  } = props;
  return (
    <FormRowWrapper className="form-row">
      {label && type !== 'checkbox' && <label htmlFor={id}>{label}:</label>}
      {(type === 'text' ||
        type === 'email' ||
        type === 'tel' ||
        type === 'number' ||
        type === 'search' ||
        type === 'password' ||
        type === 'url') && (
        <input
          type={type}
          id={id}
          className="form-input"
          name={name}
          value={value}
          required={required}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
      {type === 'checkbox' && (
        <>
          <span className="checkbox-title">{label}:</span>
          <label htmlFor={id} className="checkbox-label">
            <input
              type="checkbox"
              id={id}
              className="form-input"
              name={id}
              checked={checked}
              required={required}
              onChange={handleChange}
            />
            <div className="checkbox-toggle"></div>
          </label>
        </>
      )}
    </FormRowWrapper>
  );
};

FormRow.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.string,
  handleChange: PropTypes.func,
};

export default FormRow;
