import { poems } from '@/db/poems'
import { Poem } from '@/model/Poem'
import { daysSince } from './countDay'
import { shuffle } from 'lodash'

const todayBeyt: Poem = poems[daysSince]

const beytFirstPartWords: string[] = todayBeyt?.m1.split(' ')
const beytFirstPartAnswers: string[] = beytFirstPartWords?.filter(
  (word) => word.length === 5
)
const firstAnswerWord: number = 0
const beytFirstPartAnswer: string = beytFirstPartAnswers?.[firstAnswerWord]
const answerHintPlaceholder: string = beytFirstPartAnswer
  ?.split('')
  .map((letter, i) => (i === 4 || i === 0 || i === 1 ? letter : '*'))
  .join(' ')

const beytSecondPartWords: string[] = todayBeyt.m2.split(' ')
const beytSecondPartWordsShuffled: string[] = shuffle(todayBeyt.m2.split(' '))

export {
  todayBeyt,
  beytFirstPartWords,
  beytFirstPartAnswer,
  beytSecondPartWords,
  beytSecondPartWordsShuffled,
  answerHintPlaceholder,
}
