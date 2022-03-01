import {
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaMoon, FaQuestionCircle, FaSun } from 'react-icons/fa'

const Navbar: () => JSX.Element = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

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
        size='md'
        fontSize='lg'
        aria-label='راهنما'
        variant='ghost'
        color='GrayText'
        ml={[0, 3]}
        icon={<FaQuestionCircle />}
      />
    </Flex>
  )
}

export default Navbar
