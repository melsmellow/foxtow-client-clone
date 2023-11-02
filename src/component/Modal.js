import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

// const CustomModalHeader = styled(ModalHeader)``

function CustomModal({
  size,
  isOpen,
  onOpen,
  onClose,
  title,
  children,
  ...props
}) {
  return (
    <>
      <Modal onClose={onClose} size={size} isOpen={isOpen} {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader backgroundColor="blue.900" color="white">
            {title}
          </ModalHeader>
          <Divider />
          <ModalCloseButton color="white" />
          <ModalBody>{children}</ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomModal;
