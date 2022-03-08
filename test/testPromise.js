function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Now we have the data")
            resolve({userEmail: email})
        }, 2000)
    })
}


function getUserVideos(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["video1", "video2", "video3"])
        }, 2000)
    })
}

function videoDetails(video) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('title of the video')
        }, 2000)
    })
}
console.log("Start")


// const user = loginUser("myemail@google.com", 123456, (user) => {
//     console.log(user)
//     getUserVideos(user.userEmail, (videos) => {
//         console.log(videos)
//         videoDetails(videos[0], (title) => {
//             console.log(title)
//         })
//     })
// })

loginUser('ed', 'bumba')
    .then(user => getUserVideos(user.email))
    .then(video => videoDetails(video[0]))
    .then(detail => console.log(detail))


console.log("End")