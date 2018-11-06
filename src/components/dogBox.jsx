import React, { Component } from 'react'
import styled from 'styled-components'

class DogBox extends Component {
  render() {
    const { id, server, farm, secret } = this.props
    const link =
      'https://farm' +
      farm +
      '.staticflickr.com/' +
      server +
      '/' +
      id +
      '_' +
      secret +
      '.jpg'
    return (
      <Box>
        <Photo src={link} alt={id} />
      </Box>
    )
  }
}

const Photo = styled.img`
  border-radius: 7px;
  width: 100%;
  height: 100%;
`

const Box = styled.div`
  width: 10rem;
  height: 10rem;
  float: left;
  margin-left: 2rem;
  margin-top: 5rem;
`

export default DogBox
