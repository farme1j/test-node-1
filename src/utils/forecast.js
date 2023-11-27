import request from 'request';
export const forecast = (latitude, longitude, callback)=>{

    const url = `http://api.weatherstack.com/current?access_key=bbd0b74f4115ac5b036249b5b1cd3ddc&query=${latitude},${longitude}&units=m`
    request({url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to weather service',undefined)
        } else if (body.error){
            callback('Unable to find location',undefined)
        } else{
                const {current,location}   = body
                callback(undefined, `weather for ${location.name} is ${current.temperature} C and is ${current.weather_descriptions[0]} with ${current.precip}% chance of rain`)
        } 
    }
    )
}