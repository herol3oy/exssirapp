import arrayMove from 'array-move'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import SortableList, { SortableItem } from 'react-easy-sort'
import Navbar from '@/components/navbar'
import { poems } from '@/db/poems'
import { useIsBrowser } from '@/hooks/useIsBrowser'
import { arrayEquals } from '@/utils/arrayEquals'
import { daysSince } from '@/utils/countDay'

const todayBeyt = poems[daysSince]
const beytFirstPartWordsSplited: string[] = todayBeyt?.m1.split(' ')
const beytFirstPartAnswers: string[] = beytFirstPartWordsSplited?.filter(
  (w) => w.length === 5
)
const firstAnswerWord: number = 0
const beytFirstPartAnswer: string = beytFirstPartAnswers?.[firstAnswerWord]
const todayBeytSecondPart = todayBeyt.m2.split(' ').reverse()
const initialStateRandomizedMessage = todayBeyt.m2
  .split(' ')
  .sort(() => Math.random() - 0.5)

const answerHintPlaceholder = beytFirstPartAnswer
  ?.split('')
  .map((letter, i) => (i === 4 || i === 0 || i === 1 ? letter : '*'))
  .join(' ')

const IndexPage: () => boolean | JSX.Element = () => {
  const [userInputAnswer, userInputAnswerSet] = useState<string | undefined>('')
  const [isBeytFirstPartAnswerCorrect, isBeytFirstPartAnswerCorrectSet] =
    useState<boolean>(false)
  const [isBeytSecondPartAnswerCorrect, isBeytSecondPartAnswerCorrectSet] =
    useState<boolean>(false)
  const [todayBeytRandomized, todayBeytRandomizedSet] = useState<string[]>(
    initialStateRandomizedMessage
  )
  const [isGameFinished, isGameFinishedSet] = useState<boolean>(false)

  const { isBrowser } = useIsBrowser()

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    todayBeytRandomizedSet((array) => arrayMove(array, oldIndex, newIndex))
  }

  useEffect(() => {
    isBeytFirstPartAnswerCorrectSet(false)
    isBeytSecondPartAnswerCorrectSet(false)
    isGameFinishedSet(false)

    if (arrayEquals(todayBeytRandomized, todayBeytSecondPart)) {
      isBeytSecondPartAnswerCorrectSet(true)
    }

    if (beytFirstPartAnswer === userInputAnswer) {
      isBeytFirstPartAnswerCorrectSet(true)
      localStorage.setItem('answer', userInputAnswer)
    } else {
      isBeytFirstPartAnswerCorrectSet(false)
    }

    if (isBeytFirstPartAnswerCorrect && isBeytSecondPartAnswerCorrect) {
      isGameFinishedSet(true)
    }
  }, [
    userInputAnswer,
    isBeytFirstPartAnswerCorrect,
    isBeytSecondPartAnswerCorrect,
    todayBeytRandomized,
  ])

  return (
    isBrowser && (
      <>
        <Navbar />
        {isGameFinished && <Confetti />}
        <section>
          <article>
            {beytFirstPartWordsSplited?.map((word: string) =>
              word === beytFirstPartAnswer ? (
                <input
                  key={`${word}${Math.random().toString()}`}
                  type='text'
                  disabled={isBeytFirstPartAnswerCorrect}
                  placeholder={answerHintPlaceholder}
                  autoFocus
                  value={userInputAnswer}
                  onChange={(e) => userInputAnswerSet(e.target.value)}
                />
              ) : (
                <span key={`${word}${Math.random().toString()}`}>{word}</span>
              )
            )}
          </article>
          <article>
            <SortableList
              lockAxis='x'
              style={{ display: 'flex', direction: 'ltr' }}
              onSortEnd={onSortEnd}
              className='list'
              draggedItemClassName='dragged'
            >
              {todayBeytRandomized.map((word) => (
                <SortableItem key={`${word}${Math.random().toString()}`}>
                  <span
                    style={{
                      border: '2px solid white',
                      backgroundColor: isBeytSecondPartAnswerCorrect
                        ? 'lightgreen'
                        : '#d7e7ed',
                      borderRadius: '22px',
                      padding: '7px',
                      width: 'min-content',
                    }}
                  >
                    {word}
                  </span>
                </SortableItem>
              ))}
            </SortableList>
          </article>
          <small>{todayBeyt?.poet}</small>

          <style jsx>{`
            input {
              border-bottom-color: ${isBeytFirstPartAnswerCorrect
                ? 'lightgreen'
                : ''};
            }
          `}</style>
        </section>
      </>
    )
  )
}

export default IndexPage
