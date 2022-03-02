import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalProps,
} from '@chakra-ui/react'

const HowToPlayModal = ({ isOpen, onClose }: ModalProps): JSX.Element => {
  return (
    <Modal onClose={onClose} size='md' isOpen={isOpen}>
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
      />
      <ModalContent>
        <ModalHeader color='GrayText' textAlign='center'>
          راهنمای بازی
        </ModalHeader>
        <ModalCloseButton color='GrayText' />
        <ModalBody color='GrayText'>
          <Text fontSize='sm'>
            بیت اول سه حرف از یک کلمه پنج حرفی را حدس بزنید و سپس کلمه را تایپ
            کنید.
          </Text>
          <Text mt={2} fontSize='sm'>
            بیت دوم دارای پنج کلمه است که از طریق گرفتن و انداختن میبایست در
            ترتیب مناسب قرار بگیرند.
          </Text>
          <hr style={{ margin: '10px 0' }} />
        </ModalBody>
        <ModalFooter ml='auto'>
          <Text color='green.300' fontSize='sm'>
            اکسیر هر روز با یک بیت جدید با شما خواهد بود.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default HowToPlayModal
