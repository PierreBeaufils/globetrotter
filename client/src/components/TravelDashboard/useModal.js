import { useState } from 'react';

// function to select the modale to display
const useModal = (modalName) => {
  const [isShowingModalDeleteCard, setIsShowingModalDeleteCard] = useState(false);
  const [isShowingModalCardDescription, setIsShowingModalCardDescription] = useState(false);
  const [isShowingModalAddAccomodation, setIsShowingModalAddAccomodation] = useState(false);
  const [isShowingModalAddTransport, setIsShowingModalAddTransport] = useState(false);
  const [isShowingModalAddActivity, setIsShowingModalAddActivity] = useState(false);
  const [isShowingModalAddMembers, setIsShowingModalAddMembers] = useState(false);

  function toggleModalDeleteCard() {
    setIsShowingModalDeleteCard(!isShowingModalDeleteCard);
  }
  function toggleModalCardDescription() {
    setIsShowingModalCardDescription(!isShowingModalCardDescription);
  }
  function toggleModalAddAccomodation() {
    setIsShowingModalAddAccomodation(!isShowingModalAddAccomodation);
  }
  function toggleModalAddTransport() {
    setIsShowingModalAddTransport(!isShowingModalAddTransport);
  }
  function toggleModalAddActivity() {
    setIsShowingModalAddActivity(!isShowingModalAddActivity);
  }
  function toggleModalAddMembers() {
    setIsShowingModalAddMembers(!isShowingModalAddMembers);
  }

  switch (modalName) {
    case 'ModalDeleteCard':

      return {
        isShowingModalDeleteCard,
        toggleModalDeleteCard,
      };
    case 'ModalCardDescription':

      return {
        isShowingModalCardDescription,
        toggleModalCardDescription,
      };
    case 'ModalAddAccomodation':

      return {
        isShowingModalAddAccomodation,
        toggleModalAddAccomodation,
      };
    case 'ModalAddTransport':

      return {
        isShowingModalAddTransport,
        toggleModalAddTransport,
      };
    case 'ModalAddActivity':

      return {
        isShowingModalAddActivity,
        toggleModalAddActivity,
      };
    case 'ModalAddMembers':

      return {
        isShowingModalAddMembers,
        toggleModalAddMembers,
      };
    default:
      return {};
  }
};

export default useModal;
