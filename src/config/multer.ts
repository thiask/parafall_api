import multer from "multer";
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req: any, file, cb) {

        if (!fs.existsSync(path.resolve(__dirname, '..', 'uploads', req.params.idProtocolo))) {
            fs.mkdirSync(path.resolve(__dirname, '..', 'uploads', req.params.idProtocolo));
        }

        cb(null, path.resolve(__dirname, '..', 'uploads', req.params.idProtocolo));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: storage });

export default uploads;