import React from 'react'
import { View } from 'react-native'
import { CourseOutline, CourseOutlineProps } from './courseOutline'
import { AnswerButtonProps } from '../components/answerButton'
import {
  CodingChoiceQuestionProps,
  CodingChoiceQuestion,
} from './courseCodingChoiceQuestion'
import {
  CodingInputQuestion,
  CodingInputQuestionProps,
} from './courseCodingInputQuestion'
import { CourseItem, CourseType } from '../../../data/api'

export interface CourseRendererProps {
  readonly courseItem: CourseItem
  readonly successHandler: () => void
}

export function CourseRenderer({
  courseItem,
  successHandler,
}: CourseRendererProps): JSX.Element {
  const { type, ...otherProps } = courseItem

  if (type === CourseType.outline) {
    return (
      <CourseOutline
        {...(otherProps as CourseOutlineProps)}
        onHold={successHandler}
      />
    )
  }

  if (type === CourseType.codingInputChoice) {
    return (
      <CodingInputQuestion
        {...(otherProps as CodingInputQuestionProps)}
        onSuccess={successHandler}
      />
    )
  }

  if (type === CourseType.choice) {
    const props = otherProps as CodingChoiceQuestionProps
    const answers: readonly AnswerButtonProps[] = props.answers.map(answer => ({
      ...answer,
      onHold: answer.correct ? successHandler : undefined,
    }))
    return <CodingChoiceQuestion {...props} answers={answers} />
  }

  return <View />
}
