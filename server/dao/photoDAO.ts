import PhotoComponent from "../components/photoComponent";
import db from '../db/photo_db';
import { 
    PhotosNotFoundError,
    PhotoNameExistsError }
    from '../errors/photoErrors';

class PhotoDAO {

    async getAllPhotos(): Promise<PhotoComponent[]> {
        return new Promise((resolve, reject) => {
            
            try {
            
                db.all("SELECT * FROM photos", [], (err: Error | null, rows: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        const photos = rows.map(row => new PhotoComponent(row.id_photo, row.photo_name));
                        if (photos.length === 0) {
                            reject(new PhotosNotFoundError());
                        }
                        resolve(photos);
                    }
                });
            
            } catch (error) {
            
                reject(error);
            
            }

        });
    }

    async addPhoto(photo: PhotoComponent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                
                db.get("SELECT 1 FROM photos WHERE photo_name = ?", [photo.photo_name], (err, row) => {
                
                    if (err) {
                        reject(err);
                        return;
                    }
                
                    if (row) {
                        reject(new PhotoNameExistsError());
                        return;
                    }
                
                    db.run("INSERT INTO photos (photo_name) VALUES (?)", [photo.photo_name], function(insertErr) {
                
                        if (insertErr) {
                
                            reject(insertErr);
                
                        } else {
                
                            resolve(true);
                
                        }
                
                    });
                
                });
            
            } catch (error) {
            
                reject(error);
            
            }
        
        });
    
    }

}

export default PhotoDAO;