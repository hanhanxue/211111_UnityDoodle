function loginUser(email, password, callback) {
    setTimeout(() => {
        console.log("Now we have the data")
        callback({userEmail: email})
    }, 2000)
}


function getUserVideos(email, callback) {
    setTimeout(() => {
        callback(["video1", "video2", "video3"])
    }, 2000)
}

function videoDetails(video, callback) {
    setTimeout(() => {
        callback('title of the video')
    }, 2000)
}
console.log("Start")


const user = loginUser("myemail@google.com", 123456, (user) => {
    console.log(user)
    getUserVideos(user.userEmail, (videos) => {
        console.log(videos)
        videoDetails(videos[0], (title) => {
            console.log(title)
        })
    })
})

console.log("End")





// function getUserVideos(email) {
//     setTimeout(() => {
//         return ["video1", "video2", "video3"]
//     }, 2000)
// }