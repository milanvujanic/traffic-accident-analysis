import PropTypes from "prop-types";

const FormInput = ({
  type = "text",
  id,
  icon,
  placeholder,
  register,
  errors,
  styles: { formControl, formData, error, hidden },
}) => {
  const isErrorPresent = () => {
    return errors !== undefined && errors.message !== undefined;
  };

  return (
    <div className={formControl}>
      <div className={formData}>
        <label htmlFor={id}>{icon}</label>
        <input type={type} id={id} placeholder={placeholder} {...register} />
      </div>
      <p className={isErrorPresent() ? error : hidden}>
        * {isErrorPresent() ? errors.message : ""}
      </p>
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  errors: PropTypes.object,
  styles: PropTypes.object.isRequired,
};

export default FormInput;
