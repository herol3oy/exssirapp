import {
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Children } from 'react'
import { FaMoon, FaQuestionCircle, FaSun } from 'react-icons/fa'
import HowToPlayModal from './howToPlayModal'

const Navbar: () => JSX.Element = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  return (
    <Flex justifyContent='space-between' maxH='70px' borderBottomWidth='thin'>
      <IconButton
        size='md'
        fontSize='lg'
        aria-label={`Switch to ${text} mode`}
        variant='ghost'
        color='GrayText'
        ml={[0, 3]}
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
      <Heading color='green.300' fontFamily="'Lalezar', cursive">
        اکسیر
      </Heading>
      <IconButton
        onClick={onOpen}
        size='md'
        fontSize='lg'
        aria-label='راهنما'
        variant='ghost'
        color='GrayText'
        ml={[0, 3]}
        icon={<FaQuestionCircle />}
      />
      <HowToPlayModal isOpen={isOpen} onClose={onClose}>
        {Children}
      </HowToPlayModal>
    </Flex>
  )
}

export default Navbar
