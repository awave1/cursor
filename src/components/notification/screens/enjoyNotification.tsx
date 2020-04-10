import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { requestReview } from 'expo-store-review'

import { Container } from '../../common/container'
import { Header } from '../../course/components/header'
import { Content } from '../../common/content'
import { Toggle } from '../../settings/components/toggle'
import { InfoScreenWithButton } from '../../common/infoScreenWithButton'
import { View } from 'react-native'
import { CourseButton } from '../../course/components/courseButton'
import { useTheme } from '../../../hooks/themeHooks'
import { useSafeAreaWithPadding } from '../../../hooks/useSafeArea'

export interface EnjoyNotificationReduxProps {
  notifications: boolean
}

export interface EnjoyNotificationReduxDispatch {
  toggleNotifications: (value: boolean) => void
}

export function EnjoyNotification({
  notifications,
  toggleNotifications,
}: EnjoyNotificationReduxProps & EnjoyNotificationReduxDispatch) {
  const navigation = useNavigation()
  const { bottom } = useSafeAreaWithPadding()
  const { colors } = useTheme()

  function onExit() {
    navigation.goBack()
  }

  return (
    <Container>
      <Header onPress={onExit} />
      <Content>
        <InfoScreenWithButton
          emoji={'🎉'}
          heading={'Having fun?'}
          description={'Maybe give a rating and setup weekly notifications'}
        />
        <Toggle
          text={'Notifications'}
          description={'Setup weekly notifications for practice.'}
          enabled={notifications}
          onValueChange={toggleNotifications}
        />
      </Content>
      <View style={{ paddingBottom: bottom }}>
        <CourseButton
          text={'Hold to rate'}
          marker={'🤩'}
          finalColor={colors.primary.buttonSucessColor}
          onHold={() => {
            requestReview()
            navigation.goBack()
          }}
        />
      </View>
    </Container>
  )
}
