import React, {useState} from 'react'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

import {MainLayout} from './src/MainLayout'
import {TodoState} from './src/context/todo/TodoState'
import {ScreenState} from './src/context/screen/ScreenState'


async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [loading, setLoading] = useState(false)

  if (!loading) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={error => console.error(error)}
        onFinish={() => setLoading(true)}
      />
    )
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout/>
      </TodoState>
    </ScreenState>
  )
}

