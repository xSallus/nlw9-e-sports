import './src/services/notificationConfigs'

import { useRef, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { Subscription } from 'expo-modules-core'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter'

import { Game } from './src/screens/game'
import { Background } from './src/components/background'
import { Loader } from './src/components/loading'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'
import { Notifications } from './src/services/notificationConfigs'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

	const getNotificationtionListener = useRef<Subscription>()
	const responseNotificationListener = useRef<Subscription>()

	useEffect(() => {
	  getPushNotificationToken()
	}, [])

	useEffect(() => {
	  getNotificationtionListener.current = Notifications.addNotificationReceivedListener(console.log)

		responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(console.log)

		return () => {
		  if(getNotificationtionListener.current && responseNotificationListener.current) {
			  Notifications.removeNotificationSubscription(getNotificationtionListener.current)
				Notifications.removeNotificationSubscription(responseNotificationListener.current)
			}
		}
	}, [])

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Game /> : <Loader />}
    </Background>
  )
}
