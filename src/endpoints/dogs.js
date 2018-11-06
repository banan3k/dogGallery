const LINK =
  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ceeef7acfca34f54ba90eeb4196888be&text=dogs&format=json&nojsoncallback=1&per_page=100'

//const specificLINK =
//  'https://farm5.staticflickr.com/4906/45666774402_acf5eb0c1c.jpg/'
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

const getAllDogs = async page => {
  const link = LINK + '&page=' + page
  return await fetch(link)
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
      return json.photos
    })
    .catch(function(error) {
      return false
    })
}
const getDogsDate = async (start, end) => {
  let link = LINK
  if (start) {
    link += '&min_upload_date=' + start
  }
  if (end) {
    link += '&max_upload_date=' + end
  }

  return await fetch(link)
    .then(resp => resp.json())
    .then(json => {
      return json.photos
    })
    .catch(function(error) {
      return false
    })
}
const getDogsAccuracy = async accuracy => {
  const link = LINK + accuracy
  return await fetch(link)
    .then(resp => resp.json())
    .then(json => {
      return json.photos
    })
    .catch(function(error) {
      return false
    })
}

// const getPhotoDog = async (farmId, serverId, id, secret) => {
//   const link =
//     'https://farm' +
//     farmId +
//     '.staticflickr.com/' +
//     serverId +
//     '/' +
//     id +
//     '_' +
//     secret +
//     '.jpg'
//   return await fetch(link)
//     .then(json => {
//       console.log(json)
//       return json.photos
//     })
//     .catch(function(error) {
//       return error
//     })
// }

const b = () => {
  return 'b'
}

export default { getAllDogs, getDogsDate, getDogsAccuracy, b }
