import React, { Component } from 'react'
import styled from 'styled-components'

class DogBox extends Component {
  render() {
    return <Box>aaaaa</Box>
  }
}

const Box = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: red;
  float: left;
  margin-left: 1rem;
  margin-top: 1rem;
`

export default DogBox
