import Link from 'next/link'
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
  Divider,
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
      <ModalContent mx='2'>
        <ModalHeader color='GrayText' textAlign='center'>
          راهنمای اکسیر
        </ModalHeader>
        <Divider style={{ margin: '10px 0' }} />

        <ModalCloseButton color='GrayText' />
        <ModalBody color='GrayText'>
          <Text fontSize='md' mb={2}>
            در مرحله اول و دوم، مصرع ها رو به روش گرفتن و انداختن به ترتیب قرار
            دهید.
          </Text>
          <Text mt={2} fontSize='md' mb={2}>
            در مرحله سوم، تمام حروف کلمه پنج حرفی را تایپ کنید.
          </Text>
          <Text mt={2} fontSize='sm' fontWeight='thin'>
            اپلیکشن اکسیر الهام گرفته از بازی
            {` `}
            <Link
              href='https://www.nytimes.com/games/wordle/index.html'
              passHref
            >
              <a
                target='_blank'
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
              >
                Wordle
              </a>
            </Link>
            {` `}
            روزنامه نیویورک تایمز است که هدف توسعه دهنده از راه‌اندازی این
            اپلیکشن رونق بیشتر شعر خوانی و حفظ ابیات فارسی از طریق انجام یک بازی
            ساده آنلاین است. منبع اشعار استفاده شده وبسایت
            {` `}
            <Link href='https://ganjoor.net/' passHref>
              <a
                target='_blank'
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
              >
                کنجور
              </a>
            </Link>
            {` `}
            است که پس از پایان بازی لینک بیت قابل دسترس خواهد بود.
          </Text>
        </ModalBody>
        <Divider style={{ margin: '10px 0' }} />
        <ModalFooter ml='auto'>
          <Text color='green.300' fontSize='sm'>
            اکسیر هر ۲۴ ساعت با بیت جدید بروزرسانی می‌شود.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default HowToPlayModal
