import React, { Component } from 'react'
import styled from 'styled-components'

import dogsData from './endpoints/dogs'

import Gallery from './components/gallery'

import './App.css'

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Title>Dogs gallery</Title>
        </Header>
        <Gallery />
      </Wrapper>
    )
  }
}

const Header = styled.div`
  background-color: #282c34;
  height: 3rem;
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: #282c34;
`

const Title = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

export default App
