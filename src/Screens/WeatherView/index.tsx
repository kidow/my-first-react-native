import React, { useState, useEffect } from 'react'
import GeoLocation from 'react-native-geolocation-service'
import Styled from 'styled-components/native'
import { FlatList, Alert } from 'react-native'

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #eee;
`

const WeatherContainer = Styled(FlatList)``

const LoadingView = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Loading = Styled.ActivityIndicator`
  margin-bottom: 16px;
`

const LoadingLabel = Styled.Text`
  font-size: 16px;
`

const WeatherItemContainer = Styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Weather = Styled.Text`
  font-size: 24px;
  font-weight: bold;
`

const Temperature = Styled.Text`
  font-size: 16px;
`

interface Props {}

const API_KEY = '09d22861f3a0933a7c6ba744ecbae7a4'

interface IWeather {
  temperature?: number
  weather?: string
  isLoading: boolean
}

const WeatherView = ({}: Props) => {
  const [weahterInfo, setWeatherInfo] = useState<IWeather>({
    temperature: undefined,
    weather: undefined,
    isLoading: false
  })

  const showError = (message: string): void => {
    setTimeout(() => {
      Alert.alert(message)
    }, 500)
  }

  const getCurrentWeather = () => {
    setWeatherInfo({ isLoading: false })
    GeoLocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
        )
          .then(response => response.json())
          .then(json =>
            setWeatherInfo({
              temperature: json.main.temp,
              weather: json.weather[0].main,
              isLoading: true
            })
          )
          .catch(err => {
            setWeatherInfo({ isLoading: false })
            showError('날씨 정보를 가져오는 데 살패했습니다.')
          })
      },
      err => {
        setWeatherInfo({ isLoading: false })
        showError('위치 정보를 가져오는 데 실패했습니다.')
      }
    )
  }

  useEffect(() => {
    getCurrentWeather()
  }, [])

  let data = []
  const { isLoading, weather, temperature } = weahterInfo
  if (weather && temperature) data.push(weahterInfo)

  return (
    <Container>
      <WeatherContainer
        onRefresh={() => getCurrentWeather()}
        refreshing={!isLoading}
        data={data}
        keyExtractor={(item, index) => `Weather-${index}`}
        ListEmptyComponent={
          <LoadingView>
            <Loading size="large" color="#1976d2" />
            <LoadingLabel>Loading...</LoadingLabel>
          </LoadingView>
        }
        renderItem={({ item, index }) => (
          <WeatherItemContainer>
            <Weather>{(item as IWeather).weather}</Weather>
            <Temperature>{(item as IWeather).temperature}</Temperature>
          </WeatherItemContainer>
        )}
        contentContainerStyle={{ flex: 1 }}
      />
    </Container>
  )
}

export default WeatherView
