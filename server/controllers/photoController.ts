import PhotoComponent from '../components/photoComponent';
import PhotoDAO from '../dao/photoDAO';

class PhotoController {

    private photoDAO: PhotoDAO;

    constructor() {
        this.photoDAO = new PhotoDAO();
    }

    async getAllPhotos(): Promise<PhotoComponent[]> {
        try {
        
            return await this.photoDAO.getAllPhotos();
        
        } catch (error) {
        
            throw new Error(`Error fetching photos: ${error.message}`);
        
        }
    }

    async addPhoto(photo: PhotoComponent): Promise<boolean> {
        try {
        
            return await this.photoDAO.addPhoto(photo);
        
        } catch (error) {
        
            throw new Error(`Error adding photo: ${error.message}`);
        
        }
    }

}

export default PhotoController;