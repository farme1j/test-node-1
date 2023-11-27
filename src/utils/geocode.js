import request from 'request';
export const geocode = (address, callback)=>{

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFtZXNmYXJtZXIiLCJhIjoiY2tuYWUzeHVzMTFhdjJ2dGF6eWFnZ3R3biJ9.XzIJgbm1CFA_h_w79vSgKA&limit=1`
    request({ url, json: true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect to Mapbox.com', undefined)
        } else if(body.features.length === 0){
                     callback('Unable to find location', undefined)
        } else{       
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitute: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }
    )

}

