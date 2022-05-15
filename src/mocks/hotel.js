export const HOTELS = [
    {_id: 1111,title: "Trident Jaipur",location:"Jaipur, Rajasthan, India",postedBy:{name:"Ryan"}, price: 1000, from: new Date(2022, 0, 1), to: new Date(), image: "https://picsum.photos/500/300",bed: 12,content : "Luxurious 5-star accommodations and service awaits at Trident Jaipur, which features breathtaking views of peaceful Mansagar Lake and the Aravalli Range"},
    {_id: 1112,title: "Holiday Inn Jaipur City Centre, an IHG Hotel",location:"Jaipur, Rajasthan, India" ,postedBy:{name:"Ryan"},price: 2000, from: new Date(2022, 1, 1), to: new Date(), image: "https://picsum.photos/500/300?grayscale",bed: 12,content : "Offering an outdoor swimming pool, a fitness center and a spa and wellness center, Holiday Inn Jaipur City Center is within 2.2 mi from the architectural marvel of the City Palace and the Amer Fort"},
    {_id: 1113,title: "Hilton Jaipur",location:"Jaipur, Rajasthan, India",postedBy:{name:"Ryan"}, price: 3000, from: new Date(2022, 2, 1), to: new Date(), image: "https://picsum.photos/500/300",bed: 12,content : "Located at just a 10-minute drive from Jaipur Railway Station and 25-minute drive from Jaipur International Airport, Hilton Jaipur operates with a swimming pool and spectacular views of the scenic"},
    {_id: 1114,title: "Radisson Jaipur City Center",location:"Jaipur, Rajasthan, India",postedBy:{name:"Ryan"}, price: 3000, from: new Date(2022, 2, 1), to: new Date(), image: "https://picsum.photos/500/300",bed: 12,content : "Located in Jaipur, a 10-minute walk from Sindhi Camp, Radisson Jaipur City Center has accommodations with a restaurant, free private parking, an outdoor swimming pool and a fitness center"},
    {_id: 1115,title: "Jagat Niwas Palace",location:"Udaipur, Rajasthan, India",postedBy:{name:"Ryan"}, price: 1000, from: new Date(2022, 0, 1), to: new Date(), image: "https://picsum.photos/500/300",bed: 12,content : "Located on the eastern banks of the famous Lake Pichola and the Lal Ghat Road sits Jagat Niwas Palace, an early 17th century haveli (mansion) featuring traditional Mewar architecture"},
    {_id: 1116,title: "Shiv Niwas Palace by HRH Group of Hotels",location:"Udaipur, Rajasthan, India" ,postedBy:{name:"Ryan"},price: 2000, from: new Date(2022, 1, 1), to: new Date(), image: "https://picsum.photos/500/300?grayscale",bed: 12,content : "The crescent-shaped palace, built in the early 20th century, in the reign of Maharana Fateh Singh been meticulously maintained and preserved"},
    {_id: 1117,title: "Taj Lake Palace Udaipur",location:"Udaipur, Rajasthan, India",postedBy:{name:"Ryan"}, price: 3000, from: new Date(2022, 2, 1), to: new Date(), image: "https://picsum.photos/500/300",bed: 12,content : "Located in the middle of Lake Pichola and built in 1746, Taj Lake Palace is built with marble and features majestic architecture"},
    {_id: 1118,title: "Hotel Mewari Villa",location:"Udaipur, Rajasthan, India",postedBy:{name:"Ryan"}, price: 3000, from: new Date(2022, 2, 1), to: new Date(), image: "https://picsum.photos/500/300",bed: 12,content : "Offering a restaurant, Hotel Mewari Villa is located in Udaipur. Free Wi-Fi access is available. Rooms here will provide you with a flat-screen TV, air conditioning and cable channels."}
]

export const HOTELS_MOCK = {
    data: HOTELS
}


export const SINGLE_HOTELS_MOCK = {
    data: HOTELS[0]
}

export function getSelectedHotel(id) {
    return {
        data: HOTELS.find((hotel) => hotel._id == id)
    }
}