import * as React from 'react'
import { useState } from 'react'
import Styled from 'styled-components/native'
import Button from '~/Components/Button'

const Container = Styled.SafeAreaView`
  flex: 1;
`

const TitleContainer = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const TitleLabel = Styled.Text`
  font-size: 24px;
`

const CountContainer = Styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`

const CountLabel = Styled.Text`
  font-size: 24px;
  font-weight: bold;
`

const ButtonContainer = Styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

interface Props {
  title?: string
  initValue: number
}

interface State {
  count: number
}

// const Counter = ({ title, initValue }: Props) => {
//   const [count, setCount] = useState<number>(0)
//   return (
//     <Container>
//       {title && (
//         <TitleContainer>
//           <TitleLabel>{title}</TitleLabel>
//         </TitleContainer>
//       )}
//       <CountContainer>
//         <CountLabel>{initValue + count} </CountLabel>
//       </CountContainer>
//       <ButtonContainer>
//         <Button iconName="plus" onPress={() => setCount(count + 1)} />
//         <Button iconName="minus" onPress={() => setCount(count - 1)} />
//       </ButtonContainer>
//     </Container>
//   )
// }

class Counter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      count: props.initValue
    }
  }

  render() {
    const { count } = this.state
    const { title, initValue } = this.props
    return (
      <Container>
        {title && (
          <TitleContainer>
            <TitleLabel>{title}</TitleLabel>
          </TitleContainer>
        )}
        <CountContainer>
          <CountLabel>{initValue + count} </CountLabel>
        </CountContainer>
        <ButtonContainer>
          <Button
            iconName="plus"
            onPress={() => this.setState({ count: count + 1 })}
          />
          <Button
            iconName="minus"
            onPress={() => this.setState({ count: count - 1 })}
          />
        </ButtonContainer>
      </Container>
    )
  }
}

export default Counter
