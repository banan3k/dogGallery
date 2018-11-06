import React, { Component } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import DogBox from './dogBox'
import DogMap from './dogMap'

import dogsData from '../endpoints/dogs'

let page = 2
let oldPhotos = []
class Gallery extends Component {
  state = { dogs: null, photos: [], error: false, mapOn: false, author: false }

  componentDidMount() {
    this.fetchDogs(1)
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling)
  }

  async fetchDogs(pageIndex) {
    const allDogs = await dogsData.getAllDogs(pageIndex)
    if (allDogs) {
      this.setState({ dogs: allDogs.photo })
      document.addEventListener('scroll', this.trackScrolling)
    } else {
      this.setState({ error: true })
    }
  }

  isBottom() {
    const scrollMaxY =
      window.scrollMaxY ||
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    return window.scrollY >= scrollMaxY
  }

  trackScrolling = () => {
    const { dogs } = this.state
    if (this.isBottom()) {
      if (dogs) {
        oldPhotos = oldPhotos.concat(dogs)
      }
      document.removeEventListener('scroll', this.trackScrolling)
      this.fetchDogs(++page)
    }
  }

  filterByAuthor = id => dog => {
    return dog.owner.indexOf(id) >= 0
  }
  authorFilter = id => e => {
    const authorDogs = this.state.dogs.filter(this.filterByAuthor(id))
    this.setState({
      dogs: authorDogs,
      author: true,
    })
  }
  fetchDogsDate = () => async () => {
    const { startDate, endDate } = this.state
    const tsStart = Math.round(new Date(startDate).getTime() / 1000)
    const tsEnd = Math.round(new Date(endDate).getTime() / 1000)
    const allDogs = await dogsData.getDogsDate(tsStart, tsEnd)
    if (allDogs) {
      this.setState({ dogs: allDogs.photo })
    } else {
      this.setState({ error: true })
    }
  }
  async fetchDogsLocation() {
    const accuracy = 1
    const allDogs = await dogsData.getDogsAccuracy(accuracy)
    if (allDogs) {
      this.setState({ dogs: allDogs.photo })
    } else {
      this.setState({ error: true })
    }
  }

  turnMapOn = () => {
    const { mapOn } = this.state
    this.setState({ mapOn: !mapOn })
  }

  refreshPage = () => {
    this.setState({
      author: false,
    })
    this.fetchDogs(page)
  }

  changeDate = start => date => {
    if (start) {
      this.setState({
        startDate: date,
      })
    } else {
      this.setState({
        endDate: date,
      })
    }
  }

  render() {
    const { dogs, error, mapOn, author, startDate, endDate } = this.state
    return (
      <GalleryArea onBlur={this.temp}>
        {mapOn && <DogMap />}
        <Panel>
          <Button onClick={this.refreshPage}>
            {author ? 'Back' : 'Refresh'}
          </Button>
          <Button onClick={this.turnMapOn}>Map</Button>
          <Button onClick={this.fetchDogsDate()}>Date</Button>
          <DatePickerStyled
            placeholderText="Start date"
            selected={startDate}
            onChange={this.changeDate(true)}
          />
          <DatePickerStyled
            placeholderText="End date"
            selected={endDate}
            onChange={this.changeDate(false)}
          />
        </Panel>
        {page > 1 &&
          oldPhotos.map((photo, index) => {
            return (
              <Wrapper
                key={'wo' + index}
                onClick={this.authorFilter(photo.owner)}>
                <DogBox
                  onClick={() => this.authorFilter}
                  key={'o' + index}
                  id={photo.id}
                  server={photo.server}
                  secret={photo.secret}
                  farm={photo.farm}
                />
              </Wrapper>
            )
          })}
        {dogs &&
          dogs.map((photo, index) => {
            return (
              <Wrapper
                key={'w' + index}
                onClick={this.authorFilter(photo.owner)}>
                <DogBox
                  key={index}
                  id={photo.id}
                  server={photo.server}
                  secret={photo.secret}
                  farm={photo.farm}
                />
              </Wrapper>
            )
          })}
        {!dogs &&
          (error === true ? (
            <Message>Error</Message>
          ) : (
            <Message>Loading</Message>
          ))}
      </GalleryArea>
    )
  }
}

const Message = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: grey;
  text-align: center;
`

const Panel = styled.div`
  border: 1px solid black;
  min-height: 2rem;
  width: 100%;
  position: absolute;
  background-color: #282c34;
`

const DatePickerStyled = styled(DatePicker)`
  height: 100%;
  margin-top: 2%;
`

const Button = styled.div`
  line-height: 28px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  background-color: grey;
  height: 100%;
  min-width: 10%;
  margin-left: 5%;
  float: left;
`

const Wrapper = styled.div``

const GalleryArea = styled.div`
  align-items: center;
  background-color: blue;
  height: 100% !important;
  width: 100%;
`

export default Gallery
