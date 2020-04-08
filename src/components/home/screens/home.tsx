import React, { useEffect, useRef } from 'react'
import { View, ScrollView, StyleSheet, Animated } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { Header } from '../components/header'
import { Container } from '../../common/container'
import { LanguageCard } from '../components/languageCard'
import { Screens } from '../../../navigation/screens'
import { useTheme } from '../../../hooks/themeHooks'
import { Loader } from '../../common/loader'
import { Sections } from '../../../redux/courseSlices'
import { CourseListItem } from '../../../data/api'
import { HomeCourseList } from '../components/homeCourseList'
import { InfoScreenWithButton } from '../../common/infoScreenWithButton'
import { CourseHeader } from '../components/courseHeader'
import { HairlineSeparator } from '../../common/hairlineSeparator'

const HEADER_MAX_HEIGHT = 400
const HEADER_MIN_HEIGHT = 100
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export interface HomeReduxProps {
  loading: boolean
  error: boolean
  courseSections: Sections
  firstTime: boolean
  name: string
}

export interface HomeReduxDispatch {
  getCourses: () => void
  setSelectedCourse: (course: CourseListItem) => void
}

export function Home({
  loading,
  error,
  courseSections,
  getCourses,
  setSelectedCourse,
  firstTime,
  name,
}: HomeReduxProps & HomeReduxDispatch) {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { top } = useSafeArea()

  const scrollYAnimated = useRef(new Animated.Value(-HEADER_MAX_HEIGHT)).current

  useEffect(() => {
    getCourses()
  }, [])

  function renderHomeCourses() {
    if (error) {
      return (
        <InfoScreenWithButton
          emoji={'😢'}
          heading={'Error'}
          description={'Failed to fetch courses from server.'}
          buttonProps={{
            text: 'Hold to refresh',
            marker: '🔄',
            finalColor: colors.primary.buttonSucessColor,
            onHold: getCourses,
          }}
        />
      )
    }

    if (loading && courseSections.length === 0) {
      return <Loader />
    }

    return (
      <HomeCourseList
        maxHeight={HEADER_MAX_HEIGHT}
        scrollAnimationValue={scrollYAnimated}
        getCourses={getCourses}
        setSelectedCourse={setSelectedCourse}
        courseSections={courseSections}
        loading={loading}
      />
    )
  }

  if (firstTime) {
    navigation.navigate(Screens.Welcome)
    return <Container />
  }

  const newScrollYAnimated = Animated.add(scrollYAnimated, HEADER_MAX_HEIGHT)

  const headingTranslate = newScrollYAnimated.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  })

  const headingOpacity = newScrollYAnimated.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  })

  const titleOpacity = newScrollYAnimated.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  return (
    <Container>
      <CourseHeader
        height={HEADER_MIN_HEIGHT}
        opacity={titleOpacity}
        title={'JavaScript'}
        emoji={'🤓'}
      />
      <Animated.View
        style={[
          styles.HeadingContainer,
          {
            top,
            opacity: headingOpacity,
            transform: [{ translateY: headingTranslate }],
          },
        ]}
      >
        <Header
          title={'Hi 👋'}
          subtitle={`Welcome back, ${name}`}
          icon={{
            emoji: '⚙️',
            onPress: () => navigation.navigate(Screens.Settings),
          }}
        />
        <View style={styles.LanguagesContainer}>
          <ScrollView
            style={styles.LanguagesScrollContainer}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <LanguageCard
              selected={true}
              onPress={() => undefined}
              title={'JavaScript'}
              emoji={'🤓'}
              color={'#FED18C'}
            />
            <LanguageCard
              selected={false}
              onPress={() => alert('Coming soon!')}
              title={'Python'}
              emoji={'🐍'}
              color={'#4B8BBE'}
            />
          </ScrollView>
        </View>
        <Header title={'Courses'} />
        <HairlineSeparator extraSpacing />
      </Animated.View>
      {renderHomeCourses()}
    </Container>
  )
}

const styles = StyleSheet.create({
  HeadingContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 300,
  },
  LanguagesContainer: {
    marginTop: 40,
  },
  LanguagesScrollContainer: {
    marginHorizontal: -20,
  },
})
