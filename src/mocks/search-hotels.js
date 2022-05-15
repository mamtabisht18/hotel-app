import {HOTELS} from './hotel'




export function searchHotels(query) {
    const results = HOTELS.filter(hotes=> hotes.location.indexOf(query.location) != -1)
    console.log(results)
    return {
        data: results
    }
}