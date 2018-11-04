import React, { Component } from 'react'
import styled from 'styled-components'

import DogBox from './dogBox'

import dogsData from '../endpoints/dogs'

class Gallery extends Component {
  state = { dogs: [] }
  temp = []

  async componentDidMount() {
    const dogs = await dogsData.getAllDogs()
    this.setState({ dogs: dogs.photo })
  }

  render() {
    return (
      <GalleryArea>
        {this.state.dogs.map(photo => {
          return <DogBox />
        })}
      </GalleryArea>
    )
  }
}

const GalleryArea = styled.div`
  background-color: blue;
  height: 100% !important;
  width: 100%;
`

export default Gallery
