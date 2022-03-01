import Navbar from '@/components/navbar'
import { useIsBrowser } from '@/hooks/useIsBrowser'
import { arrayEquals } from '@/utils/arrayEquals'
import {
  answerHintPlaceholder,
  beytFirstPartAnswer,
  beytFirstPartWords,
  beytSecondPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import arrayMove from 'array-move'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import SortableList, { SortableItem } from 'react-easy-sort'

const IndexPage: () => boolean | JSX.Element = () => {
  const [userInputAnswer, userInputAnswerSet] = useState<string | undefined>('')
  const [isBeytFirstPartAnswerCorrect, isBeytFirstPartAnswerCorrectSet] =
    useState<boolean>(false)
  const [isBeytSecondPartAnswerCorrect, isBeytSecondPartAnswerCorrectSet] =
    useState<boolean>(false)
  const [todayBeytRandomized, todayBeytRandomizedSet] = useState<string[]>(
    beytSecondPartWordsShuffled
  )
  const [isGameFinished, isGameFinishedSet] = useState<boolean>(false)

  const { isBrowser } = useIsBrowser()

  useEffect(() => {
    isBeytFirstPartAnswerCorrectSet(false)
    isBeytSecondPartAnswerCorrectSet(false)
    isGameFinishedSet(false)

    if (arrayEquals(todayBeytRandomized, beytSecondPartWords)) {
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

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    todayBeytRandomizedSet((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    isBrowser && (
      <>
        <Navbar />
        {isGameFinished && <Confetti />}
        <section>
          <article>
            {beytFirstPartWords?.map((word: string) =>
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
