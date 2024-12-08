import axiosInstance from "../api/axiosInstance"; 


export const getAllEvents = async () => {
    try {
        const response = await axiosInstance.get('/events');  
        return response.data;  
    } catch (error) {
        console.error("There was an error fetching the events!", error);
        return [];  
    }
};

export const createEvent = async (event) => {
    try {
        const response = await axiosInstance.post('/events', event);  
        return response.data;
    } catch (error) {
        console.error("There was an error creating the event!", error);
        return null;
    }
};

export const getEventById = async (id) => {
    try {
        const response = await axiosInstance.get(`/events/${id}`); 
        return response.data;
    } catch (error) {
        console.error(`There was an error fetching the event with ID ${id}!`, error);
        return null;
    }
};