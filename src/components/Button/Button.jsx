import { LButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick, loading }) => {
  return (
    <LButton onClick={onClick} type="button" disabled={loading}>
      Load more
    </LButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
