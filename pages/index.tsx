import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { poems } from '../db/poems'
import { Poem } from '../model/Poem'
import { daysSince } from '../utils/countDay'

export default function IndexPage({ todayBeyt }: { todayBeyt: Poem }) {
  const [userInputAnswer, userInputAnswerSet] = useState<string | undefined>('')
  const [isCorrect, isCorrectSet] = useState<boolean>(false)

  const beytWordsSplited: string[] = todayBeyt?.m1.split(' ')
  const beytAnswers: string[] = beytWordsSplited?.filter((w) => w.length === 5)
  const firstWord: number = 0
  const beytAnswer: string = beytAnswers?.[firstWord]

  const answerHintPlaceholder = beytAnswer
    ?.split('')
    .map((letter, i) => (i === 4 || i === 0 || i === 1 ? letter : '*'))
    .join(' ')

  useEffect(() => {
    if (beytAnswer === userInputAnswer) {
      isCorrectSet(true)
      localStorage.setItem('answer', userInputAnswer)
    } else {
      isCorrectSet(false)
    }
  }, [userInputAnswer, isCorrect, beytAnswer])

  return (
    <>
      <Navbar />
      <section>
        <article>
          {beytWordsSplited?.map((word: string) =>
            word === beytAnswer ? (
              <input
                key={`${word}${Math.random().toString()}`}
                type='text'
                disabled={isCorrect}
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
          <span>{todayBeyt?.m2}</span>
        </article>
        <small>{todayBeyt?.poet}</small>

        <style jsx>{`
          input {
            border-bottom-color: ${isCorrect ? 'lightgreen' : ''};
          }
        `}</style>
      </section>
    </>
  )
}

export async function getServerSideProps() {
  const todayBeyt: Poem = poems[Math.floor(Math.random() * poems.length)]
  return {
    props: { todayBeyt },
  }
}
