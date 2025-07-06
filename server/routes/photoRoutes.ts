import express, { Router } from 'express';
import { body } from 'express-validator';
import PhotoComponent from '../components/photoComponent';
import PhotoController from '../controllers/photoController';

class PhotoRoutes {

    private router: Router;
    private photoController: PhotoController; // Replace with actual controller type

    getRouter(): Router {
        
        return this.router;
    
    }

    constructor() {
        
        this.router = express.Router();
        this.photoController = new PhotoController(); // Initialize the controller
        this.initializeRoutes();
    
    }

    initializeRoutes() {
        this.router.get(
            '/photos',
            async (req : any, res : any, next : any) => {
                
                this.photoController
                    .getAllPhotos()
                    .then((photos: PhotoComponent[]) => {
                        res.status(200).json(photos);
                    })
                    .catch((error: Error) => {
                        res.status(500).json({ error: error.message });
                    });
            
        });

        this.router.post(
            '/add-photo', 
            body('photo_name').isString().notEmpty(),
            async (req, res) => {
            
                const photoData: PhotoComponent = req.body;
                try {
                    const result = await this.photoController.addPhoto(photoData);
                    res.status(201).json({ success: result });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            
            }
        );
    }

}

export default PhotoRoutes;