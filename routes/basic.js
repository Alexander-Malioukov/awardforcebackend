import express from 'express';
import config from '../core/config';
import dbConn from '../core/dbconn';
import common from '../core/common';
import sprintfJs from 'sprintf-js';
import db from '../core/db';
import path from "path";
import uuid from "uuid";

const router = express.Router();

const uploadProc = (req, res, next) => {
    if (req.files && req.files.uploadFile) {
        
        const file = req.files.uploadFile;
        const extension = path.extname(file.name);
        const appDir = path.dirname(require.main.filename);
        const fileName = sprintfJs.sprintf('%s%s', uuid(), extension);
        const filePath = sprintfJs.sprintf('%s/public/uploads/%s', appDir, fileName);
        
        file.mv(filePath, function(err) {
            if (err) {
                res.status(200).send({
                    result: 'error',
                    error : 'No file'
                });
                return;
            }
            res.status(200).send({
                result: 'success',
                file: '/uploads/' + fileName
            });
        });
    } else {
        res.status(200).send({
            result: 'error',
            error : 'No file'
        });
    }

}

router.post('/file-upload', uploadProc);

export default router;
