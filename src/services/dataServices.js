import {unrealUnionBackend, unrealUnionBackendAuth} from '@/routes/api/api.js';

class DataServices {
    constructor() {
    }

    //Auth
    signUpUser(username, password) {
        return unrealUnionBackend.post('/users',
            {
                username: username,
                password: password
            });
    }

    signInUser(username, password) {
        return unrealUnionBackend.post('/users/login',
            {
                username: username,
                password: password
            });
    }

    // Users
    invalidToken(userId) {
        return unrealUnionBackendAuth.delete(`/users/logout/${userId}`);
    }

    // Ratings
    rateEvent(data) {
        return unrealUnionBackendAuth.post('/events/rating', {
            userId: data.userId,
            eventId: data.eventId,
            rating: data.rating,
            comment: data.comment
        });
    }

    //Events
    createEvent(data) {
        console.log(data);
        return unrealUnionBackendAuth.post('/events', {
            name: data.name,
            description: data.description,
            location: data.location,
            date: data.date,
            category: data.category,
            participationLimit: data.participationLimit,
            creatorUserId: data.creatorUserId,
            image: data.image,
        }, {headers: {"Content-Type": "multipart/form-data"}});
    }

    getAllEvents() {
        return unrealUnionBackend.get('/events/search');
    }

    getEventByName(name) {
        return unrealUnionBackend.get(`/events/search/${name}`);
    }

    getEventById(id) {
        return unrealUnionBackend.get(`/events/${id}`);
    }

    getEventListByCategory(category) {
        return unrealUnionBackend.get(`/events/search/categories/${category}`);
    }

    updateEvent(data) {
        return unrealUnionBackendAuth.post('/events/edit', {
            eventId: data.id,
            name: data.name,
            description: data.description,
            location: data.location,
            date: data.date,
            image: data.image,
            category: data.category,
            creatorUserId: data.creatorUserId,
            participationLimit: data.participationLimit,
        }, {headers: {"Content-Type": "multipart/form-data"}});
    }

    getSelfCreatedEvents(userId) {
        return unrealUnionBackendAuth.get(`/users/events/${userId}`);
    }

    //User Events
    registerEvent(data) {
        return unrealUnionBackendAuth.post('/users/events/register', {
            userId: data.userId,
            eventId: data.eventId
        });
    }

    unregisterEvent(userId, eventId) {
        return unrealUnionBackendAuth.delete(`/users/${userId}/events/${eventId}/unregister`);
    }

    getRegisteredEvents(userId) {
        return unrealUnionBackendAuth.get(`/users/${userId}/events`);
    }
}

export default new DataServices();