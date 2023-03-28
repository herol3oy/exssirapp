import { poems } from '@/db/poems'
import { Poem } from '@/model/poem'
import daysSince from '@/utils/count-day'
import { Text } from '@chakra-ui/react'

export default function SinglePoem({ poem }: { poem: Poem }) {
  return (
    <Text mr={2} color='GrayText'>
      <pre dir='ltr'>{JSON.stringify(poem, null, 2)}</pre>
    </Text>
  )
}

export async function getStaticPaths() {
  const paths = poems.map((_, poemIndex) => ({
    params: { singlePoem: poemIndex.toString() },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({
  params,
}: {
  params: { singlePoem: string }
}) {
  if (+params.singlePoem < daysSince) {
    const poem = poems[+params.singlePoem]

    return {
      props: { poem },
    }
  } else {
    return {
      props: { poem: 'no-way' },
    }
  }
}
