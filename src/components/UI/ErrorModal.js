import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

const ErrorModal = (props) => {

  return (
    <Fragment>
      {
        ReactDOM.createPortal(
          <Modal title={props.title} messages={props.messages} onConfirm={props.onConfirm} />,
          document.getElementById("modal-root")
        )
      }
    </Fragment>
  );
};

export default ErrorModal;
