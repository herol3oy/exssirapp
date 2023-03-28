import { poems } from '@/db/poems'
import { Poem } from '@/model/poem'
import daysSince from './count-day'
import { shuffle } from 'lodash'

const todayVerse: Poem = poems[daysSince]

const firstHemistichWords: string[] = todayVerse?.m1.split(' ')

const firstHemistichAnswers: string[] = firstHemistichWords?.filter(
  (word) => word.length === 5
)

const firstAnswerWord: number = 0

const firstHemistichAnswer: string = firstHemistichAnswers?.[firstAnswerWord]

const answerHintPlaceholder: string = firstHemistichAnswer
  ?.split('')
  .map((letter, i) => (i === 4 || i === 0 || i === 1 ? letter : '*'))
  .join(' ')

const secondHemistichWords: string[] = todayVerse.m2.split(' ')

const firstHemistichWordsShuffled: string[] = shuffle(firstHemistichWords)

const secondHemistichWordsShuffled: string[] = shuffle(secondHemistichWords)

export {
  todayVerse,
  firstHemistichWords,
  firstHemistichAnswer,
  secondHemistichWords,
  firstHemistichWordsShuffled,
  secondHemistichWordsShuffled,
  answerHintPlaceholder,
}
