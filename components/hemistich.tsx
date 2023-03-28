import { Flex, Text } from '@chakra-ui/react'

const TextHemistich = ({ hemistich }: { hemistich: string[] }): JSX.Element => {
  return (
    <Flex alignItems={['flex-end', 'flex-start']}>
      {hemistich.map((word: string) => (
        <Text mr={2} color='GrayText' key={word}>
          {word}
        </Text>
      ))}
    </Flex>
  )
}

export default TextHemistich
