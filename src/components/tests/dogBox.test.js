import React from 'react'
import ReactDOM from 'react-dom'
import dogBox from '../dogBox'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<dogBox />, div)
  ReactDOM.unmountComponentAtNode(div)
})
