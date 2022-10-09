import { Dispatch, SetStateAction, useRef } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const Keypad = ({
  userInputAnswerSet,
}: {
  userInputAnswerSet: Dispatch<SetStateAction<string | undefined>>
}) => {
  const keyboard = useRef(null)

  return (
    <Keyboard
      physicalKeyboardHighlightPress
      physicalKeyboardHighlight
      physicalKeyboardHighlightBgColor='#9ab4d0'
      physicalKeyboardHighlightTextColor='white'
      maxLength={5}
      theme={'hg-theme-default hg-layout-default myTheme'}
      layout={{
        default: [
          'چ ج ح خ ه ع غ ف ق ث ص ض',
          'گ ک م ن ت آ ا ل ب ی س ش',
          '{backspace} و پ د ذ ر ز ژ ط ظ',
        ],
      }}
      display={{
        '{backspace}': `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
              </svg>`,
      }}
      keyboardRef={(r: null) => (keyboard.current = r)}
      onChange={userInputAnswerSet}
      buttonTheme={[
        {
          class: 'hg-bksp',
          buttons: '{backspace}',
        },
      ]}
    />
  )
}

export default Keypad
