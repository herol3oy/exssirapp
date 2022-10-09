import { Box, Flex, IconButton, useDisclosure, Image } from '@chakra-ui/react'
import {
  DisplayLogoContext,
  ShouldDisplayLogo,
} from 'context/displayLogoContext'
import { Children, useContext } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import HowToPlayModal from './howToPlayModal'

const Navbar: () => JSX.Element = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [displayLogo] = useContext<ShouldDisplayLogo>(DisplayLogoContext)
  return (
    <>
      <Flex maxH='70px' borderBottomWidth='thin' justifyContent='space-between'>
        <IconButton
          onClick={onOpen}
          fontSize='2xl'
          aria-label='راهنما'
          variant='ghost'
          color='GrayText'
          ml={[0, 3]}
          icon={<FaQuestionCircle />}
        />
        <Box display={displayLogo ? '' : 'none'}>
          <Image w={200} h={200} src='new-logo.jpg' alt='exssir logo' />
        </Box>
        <Box></Box>
      </Flex>
      <HowToPlayModal isOpen={isOpen} onClose={onClose}>
        {Children}
      </HowToPlayModal>
    </>
  )
}

export default Navbar
