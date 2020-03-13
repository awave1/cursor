import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Header } from './src/components/header'
import { Stepper } from './src/components/stepper'
import { CodingQuestion } from './src/components/course/courseCodingQuestion'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => undefined} title="Strings" />
      <Stepper activeStep={1} steps={10} />
      <CodingQuestion
        title={'What is a string?'}
        content={
          'Is a <length> or <percentage> representing the abscissa of the translating vector. A percentage value refers to the width of the reference box defined by the transform-box property.'
        }
        answers={[
          {
            content: 'This is a test',
            correct: true,
            explanation:
              'Is a <length> or <percentage> representing the abscissa of the translating vector.',
            onHold: () => undefined,
          },
          {
            content: 'This is a test',
            correct: false,
            explanation:
              'Is a <length> or <percentage> representing the abscissa of the translating vector.',
            onHold: () => undefined,
          },
          {
            content: 'This is a test',
            correct: false,
            explanation:
              'Is a <length> or <percentage> representing the abscissa of the translating vector.',
            onHold: () => undefined,
          },
          {
            content: 'This is a test',
            correct: false,
            explanation:
              'Is a <length> or <percentage> representing the abscissa of the translating vector.',
            onHold: () => undefined,
          },
        ]}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
})
