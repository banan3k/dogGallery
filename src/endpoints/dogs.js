const LINK =
  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ceeef7acfca34f54ba90eeb4196888be&text=dogs&format=json&nojsoncallback=1'

const specificLINK =
  'https://farm5.staticflickr.com/4906/45666774402_acf5eb0c1c.jpg/'
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

const getAllDogs = async () => {
  const link = LINK
  return await fetch(link)
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
      return json.photos
    })
    .catch(function(error) {
      return error
    })
}

const b = () => {
  return 'b'
}

export default { getAllDogs, b }
