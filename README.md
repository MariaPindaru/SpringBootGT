# Event Platform API Documentation

This API provides endpoints for user authentication and event management in an event platform. The application supports features like login, event creation, event viewing, and event booking. 

The application uses roles, where each role has a specific set of allowed operations. In this example, by default, two roles are created:

- **ROLE_USER**: This role is granted the `BOOK_EVENT` operation, allowing users to book events.
- **ROLE_ADMIN**: This role is granted the `ADD_EVENT`, `UPDATE_EVENT`, and `DELETE_EVENT` operations, allowing admins to create, update, and delete events.

Each role's permissions are enforced through the use of Spring Security, ensuring that only users with the appropriate roles can perform certain actions.


---

## Authentication API

### POST /api/auth/login

**Description**: Authenticates a user using basic authentication (username and password encoded in Base64).

**Request**:
- **Authorization** header with the format `Basic <base64-encoded-username:password>`

**Response**:
- **200 OK**: Returns a `LoginResultDTO` with authentication details.
- **400 BAD REQUEST**: If the `Authorization` header is missing or malformed.
- **401 UNAUTHORIZED**: If authentication fails.

---
## Events API

### GET /api/events

**Description**: Retrieves a list of all events.

**Request**:
- **Method**: `GET`
- **URL**: `/api/events`
- **Headers**: 
  - **Authorization**: Requires a valid JWT token in the `Authorization` header.

**Response**:
- **200 OK**: Returns a list of `EventDTO` objects representing all the events.
- **204 NO CONTENT**: If no events are available.

**Example Request**:
```http
GET /api/events
Authorization: Bearer <jwt-token>
```

### POST /api/events

**Description**: Creates a new event. Only users with the `ADD_EVENT` permission can access this endpoint.

**Request**:
- **Method**: `POST`
- **URL**: `/api/events`
- **Headers**: 
  - **Authorization**: Requires a valid JWT token in the `Authorization` header.

**Request Body**:
- The body of the request should contain an `Event` object with the following fields:
  - `title` (string): The title of the event.
  - `description` (string): A description of the event.
  - `location` (string): The location where the event will take place.
  - `dateTime` (string): The date and time of the event in ISO 8601 format (e.g., `2024-12-20T18:00:00`).

**Response**:
- **201 CREATED**: If the event is successfully created, the response will contain the created `EventDTO` object.
- **403 FORBIDDEN**: If the user does not have the `ADD_EVENT` permission.

**Example Request**:
```http
POST /api/events
Authorization: Bearer <jwt-token>
{
  "title": "New Event",
  "description": "Description of the new event",
  "location": "New Location",
  "dateTime": "2024-12-20T18:00:00"
}
```

### GET /api/events/{id}

**Description**: Retrieves the details of a specific event by its ID.

**Request**:
- **Method**: `GET`
- **URL**: `/api/events/{id}`
  - **Path Parameter**: `id` (the ID of the event).
- **Headers**: 
  - **Authorization**: Requires a valid JWT token in the `Authorization` header.

**Response**:
- **200 OK**: Returns the `EventDTO` object of the requested event.
- **404 NOT FOUND**: If the event with the specified ID does not exist.

**Example Request**:
```http
GET /api/events/1
Authorization: Bearer <jwt-token>
```

### DELETE /api/events/{id}

**Description**: Deletes a specific event by its ID. Only users with the `DELETE_EVENT` permission can access this endpoint.

**Request**:
- **Method**: `DELETE`
- **URL**: `/api/events/{id}`
  - **Path Parameter**: `id` (the ID of the event to be deleted).
- **Headers**: 
  - **Authorization**: Requires a valid JWT token in the `Authorization` header.

**Response**:
- **204 NO CONTENT**: If the event is successfully deleted.
- **404 NOT FOUND**: If the event with the specified ID does not exist.
- **403 FORBIDDEN**: If the user does not have the `DELETE_EVENT` permission.

**Example Request**:
```http
DELETE /api/events/1
Authorization: Bearer <jwt-token>
```

### PUT /api/events/{id}

**Description**: Updates an existing event by its ID. Only users with the `UPDATE_EVENT` permission can access this endpoint.

**Request**:
- **Method**: `PUT`
- **URL**: `/api/events/{id}`
  - **Path Parameter**: `id` (the ID of the event to be updated).
- **Headers**: 
  - **Authorization**: Requires a valid JWT token in the `Authorization` header.
- **Body**: The body of the request should contain an `Event` object with the updated details:
  - `title` (string): The updated title of the event.
  - `description` (string): The updated description of the event.
  - `location` (string): The updated location of the event.
  - `dateTime` (string): The updated date and time of the event in ISO 8601 format (e.g., `2024-12-20T18:00:00`).

**Response**:
- **200 OK**: Returns the updated `EventDTO` object.
- **404 NOT FOUND**: If the event with the specified ID does not exist.
- **403 FORBIDDEN**: If the user does not have the `UPDATE_EVENT` permission.

**Example Request**:
```http
PUT /api/events/1
Authorization: Bearer <jwt-token>
{
  "title": "Updated Event Title",
  "description": "Updated description of the event",
  "location": "Updated Location",
  "dateTime": "2024-12-22T15:00:00"
}
```

### POST /api/events/book/{eventId}

**Description**: Books an event for the authenticated user. Only users with the `BOOK_EVENT` permission can access this endpoint.

**Request**:
- **Method**: `POST`
- **URL**: `/api/events/book/{eventId}`
  - **Path Parameter**: `eventId` (the ID of the event to be booked).
- **Headers**: 
  - **Authorization**: Requires a valid JWT token in the `Authorization` header.

**Response**:
- **200 OK**: If the event is successfully booked, returns a confirmation message.
- **404 NOT FOUND**: If the event with the specified ID does not exist.
- **403 FORBIDDEN**: If the user does not have the `BOOK_EVENT` permission.

**Example Request**:
```http
POST /api/events/book/1
Authorization: Bearer <jwt-token>
```



