import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useTheme } from '../../hooks/themeHooks'
import {
  CourseButton,
  CourseButtonProps,
} from '../course/components/courseButton'
import { BASE_FONT_SIZE } from '../../styles/fonts'

export interface InfoScreenWithButtonProps {
  emoji: string
  heading: string
  description?: string
  buttonProps?: CourseButtonProps
}

export function InfoScreenWithButton({
  emoji,
  heading,
  description,
  buttonProps,
}: InfoScreenWithButtonProps) {
  const { font } = useTheme()

  return (
    <View style={styles.Container}>
      <View style={styles.TextContainer}>
        <Text style={styles.Emoji}>{emoji}</Text>
        <View style={styles.HeadingContainer}>
          <Text style={font.courseHeading}>{heading}</Text>
        </View>
        <Text style={font.courseMessage}>{description}</Text>
      </View>
      {buttonProps && <CourseButton {...buttonProps} />}
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  HeadingContainer: {
    marginBottom: 10,
  },
  TextContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  Emoji: {
    fontSize: BASE_FONT_SIZE * 5,
    marginBottom: 20,
  },
})