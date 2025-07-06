import express from 'express';
import PhotoRoutes from './routes/photoRoutes';
import morgan from 'morgan';

const prefix = '/cricky-portfolio/api';

function initRoutes(app : express.Application) {
    
    app.use(morgan('dev'));
    app.use(express.json({ limit: '25mb' }));
    app.use(express.urlencoded({ limit: '25mb', extended: true }));

    const photoRoutes = new PhotoRoutes();

    app.use(`${prefix}/photos`, photoRoutes.getRouter());

}

export default initRoutes;