# API Documentation

## Overview
This API allows you to manage spaces, including creating, updating, deleting, and retrieving space information.

## Base URL

```
http://localhost:3000
```

## Endpoints

### 1. Create a Space
- **POST** `/api/v1/spaces`

#### Request Body
| Field        | Type   | Required | Description                                   |
|--------------|--------|----------|-----------------------------------------------|
| `type`       | string | Yes      | Must be one of `hanger` or `shelf`.          |
| `capacity`   | number | Yes      | The capacity of the space.                    |
| `pricePerUnit` | number | Yes    | The price per unit for the space.            |

#### Possible Errors
| Error Code | Error Message                | Description                                      |
|------------|------------------------------|--------------------------------------------------|
| 400        | Bad Request                  | One or more required fields are missing.         |
| 400        | unnecessary field            | An unnecessary field was included in the request.|
| 400        | Invalid space type           | The `type` field does not match allowed types.  |
| 500        | Internal Server Error        | An unexpected error occurred on the server.     |

#### Response
- **Success**: `201 Created`
  ```json
  {
    "message": "Space created successfully",
    "data": { /* space object */ }
  }
  ```

### 2. Delete a Space
- **DELETE** `/api/v1/spaces/:spaceId`

#### Path Parameters
| Parameter  | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `spaceId`  | string | Yes      | The ID of the space to delete.      |

#### Possible Errors
| Error Code | Error Message                | Description                                      |
|------------|------------------------------|--------------------------------------------------|
| 400        | Bad Request                  | The `spaceId` is not a valid ObjectId.          |
| 404        | Not Found                    | The space with the given ID does not exist.     |
| 500        | Internal Server Error        | An unexpected error occurred on the server.     |

#### Response
- **Success**: `200 OK`
  ```json
  {
    "message": "Space deleted successfully"
  }
  ```

### 3. Update a Space
- **PUT** `/api/v1/spaces/:spaceId`

#### Path Parameters
| Parameter  | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `spaceId`  | string | Yes      | The ID of the space to update.      |

#### Request Body
| Field        | Type   | Required | Description                                   |
|--------------|--------|----------|-----------------------------------------------|
| `spaceName`       | string | yes      | Must be min and max of `3` or `16`character.          |
| `type`       | string | yes      | Must be one of `hanger` or `shelf`.          |
| `capacity`   | number | No       | The capacity of the space.                    |
| `pricePerUnit` | number | No    | The price per unit for the space.            |

#### Possible Errors
| Error Code | Error Message                | Description                                      |
|------------|------------------------------|--------------------------------------------------|
| 400        | Bad Request                  | The `spaceId` is not a valid ObjectId.          |
| 404        | Not Found                    | The space with the given ID does not exist.     |
| 500        | Internal Server Error        | An unexpected error occurred on the server.     |

#### Response
- **Success**: `200 OK`
  ```json
  {
    "message": "Space updated successfully"
  }
  ```

### 4. Get All Spaces
- **GET** `/api/v1/spaces`

#### Query Parameters
| Parameter         | Type   | Required | Description                          |
|-------------------|--------|----------|--------------------------------------|
| `selectedCategory`| string | Yes      | Required filter to get spaces of a specific type. Default is `all`. |

#### Possible Errors
| Error Code | Error Message                | Description                                      |
|------------|------------------------------|--------------------------------------------------|
| 500        | Internal Server Error        | An unexpected error occurred on the server.     |

#### Response
- **Success**: `200 OK`
  ```json
  {
    "message": "Spaces retrieved successfully",
    "data": [ /* array of space objects */ ]
  }
  ```

### 5. Get a Space by ID
- **GET** `/api/v1/spaces/:spaceId`

#### Path Parameters
| Parameter  | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `spaceId`  | string | Yes      | The ID of the space to retrieve.    |

#### Possible Errors
| Error Code | Error Message                | Description                                      |
|------------|------------------------------|--------------------------------------------------|
| 400        | Bad Request                  | The `spaceId` is not a valid ObjectId.          |
| 404        | Not Found                    | The space with the given ID does not exist.     |
| 500        | Internal Server Error        | An unexpected error occurred on the server.     |

#### Response
- **Success**: `200 OK`
  ```json
  {
    "message": "Space retrieved successfully",
    "data": { /* space object */ }
  }
  ```

## Validation Logic
The `createSpaceValidator` function checks for:
- Presence of required fields.
- Validity of the `type` field against allowed types.

## Conclusion
This API provides a simple interface for managing spaces. Ensure to follow the data structure and validation rules to avoid errors.
