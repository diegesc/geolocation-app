// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.
let options = {
    latitude: '27.9881206',
    longitude: '86.9249751'
}
let geoLoc = {}
let card = document.querySelector('.img')
let index = 0


let onSuccess = (position) => {

    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    console.log(`User's Geolocation is:
    Latitude: ${latitude} 
    Longitude: ${longitude}`)

    getPhotos(latitude,longitude, 'ferrari')
}


let onError = (error) => {
    console.error(error,
        `Ok then I'll show you something pretty at: Latitude: ${options.latitude} Longitude: ${options.longitude}`)
        getPhotos(options.latitude, options.longitude, 'everest')


}

navigator.geolocation.getCurrentPosition(onSuccess, onError)

function constructImgURL(geoLoc) {
    return `https://live.staticflickr.com/${geoLoc.server}/${geoLoc.id}_${geoLoc.secret}.jpg`
}

let getPhotos = function (lat, lon, text) {
    fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=2a8852626f2022a389cd68ae86a2ff56&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${lat}&lon=${lon}&text=${text}`)
    .then((response) => response.json())
    .then((results) => {
        geoLoc = results
        console.log(geoLoc)
        let imageUrl = constructImgURL(results.photos.photo[index])
        card.src = imageUrl
        setInterval(() => {
            if (index < geoLoc.photos.photo.length - 1) {
                index += 1
            } else {
                index = 0
            }
            card.src = constructImgURL(geoLoc.photos.photo[index])
        }, 5000)
    })
}
