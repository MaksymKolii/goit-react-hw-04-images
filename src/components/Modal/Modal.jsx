import { Overlay, ModalClass } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ url, closeModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalClass>
        <img src={url} alt="" />
      </ModalClass>
    </Overlay>,
    modalRoot
  );
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

// const App = () => {
//   useEffect(() => {
//     console.log('Mounting phase: same when componentDidMount runs');

//     return () => {
//       console.log('Unmounting phase: same when componentWillUnmount runs');
//     };
//   }, []);

//   return null;
// };
