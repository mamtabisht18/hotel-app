import {HOTELS} from './hotel'


export const BOOKINGS_HOTELS = [
    
    {
        _id: 1,
        session: {
            currency: "USD",
            amount_total: 2000,
            customer: 12,
            payment_status: "Paid",
            payment_intent:"pid_78787878"
        },
        hotel: HOTELS[0],
        orderedBy:{name: 'Ryan'} ,

    },
    {
        _id: 1,
        session: {
            currency: "USD",
            amount_total: 4000,
            customer: 78,
            payment_status: "Paid",
            payment_intent:"pid_78787878"
        },
        hotel: HOTELS[1],
        orderedBy:{name: 'Ryan'} ,
    }
]

export const BOOKINGS_HOTELS_MOCK = {
    data: BOOKINGS_HOTELS
}
