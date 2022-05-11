
const axios = require('axios').default
export const main = () => {
    populatePlatforms()
}

const URL_API = 'http://localhost:3001/api/'

/**
 * 
 */
function populatePlatforms() {
    let platforms = [
        "Bowl","Fly","Funbox","Spine","Coping","Extension","Hip","Channel","Step-up",
        "Rail","Curb","Ledge","Chinese","Rainbow","Handrail",
        "Stairs","Gap","Roof"
    ]
    let url_api = URL_API + "platforms"
    let lock = false
    console.log('Ajout de '+ platforms.length + ' elements...')
    platforms.forEach((n) => {
        axios.post(url_api, {
            params : {
                name : n
            },
    
        })
        .then(function(res) {
            console.log(n + 'ajouté !')
            console.log(res)
            
        })
        .catch (function(err) {
            console.log(err)
        })
        .then(function() {
            console.log(n + ' : fini !')
        })
        
    })

    
}