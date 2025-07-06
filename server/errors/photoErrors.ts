const PHOTOS_NOT_FOUND = "Photos not found";
const PHOTO_NAME_EXISTS = "Photo name already exists";

class PhotosNotFoundError extends Error {
    
    customMessage: string;
    customCode: number;

    constructor() {
        super();
        this.customMessage = "PhotosNotFoundError" + PHOTOS_NOT_FOUND;
        this.customCode = 404; // Not Found
    }

}

class PhotoNameExistsError extends Error {
    
    customMessage: string;
    customCode: number;

    constructor() {
        super();
        this.customMessage = "PhotoNameExistsError" + PHOTO_NAME_EXISTS;
        this.customCode = 409; // Conflict
    }

}

export {
    PhotosNotFoundError,
    PhotoNameExistsError
};