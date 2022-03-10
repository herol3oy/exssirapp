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
    <Flex
      alignItems='center'
      justifyContent='space-between'
      maxH='70px'
      borderBottomWidth='thin'
    >
      <IconButton
        fontSize='2xl'
        aria-label={`Switch to ${text} mode`}
        variant='ghost'
        color='GrayText'
        ml={[0, 3]}
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
      <Heading
        pb={2}
        pt={2}
        size='2xl'
        color='green.300'
        fontFamily="'Lalezar', cursive"
      >
        اکسیر
      </Heading>
      <IconButton
        onClick={onOpen}
        fontSize='2xl'
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
