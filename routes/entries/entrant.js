import express from 'express';
import config from '../../core/config';
import dbConn from '../../core/dbconn';
import common from '../../core/common';
import sprintfJs from 'sprintf-js';

const router = express.Router();

const indexProc = (req, res, next) => {
    const params = req.query;
    const id = params.id;

    let sql = "";
    if (id) {
        sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `id`='%d' ORDER BY `id` DESC;", config.dbTblName.seasons, +id);
    } else {
        sql = sprintfJs.sprintf("SELECT * FROM `%s` ORDER BY `id` DESC;", config.dbTblName.seasons);
    }

    dbConn.query(sql, null, (error, results, fields) => {
        if (error) {
            res.status(200).send({
                result: 'error',
                message: 'Unknown error',
                data: [],
            });
        } else {      

            results.forEach(element => {
                if (element['created_at']) {
                    element['created_at'] = common.getDays(element['created_at']);
                }
            });

            let columns = [
                // {
                //     'rowField':'id',
                //     'tblHeader':'ID',
                //     'show':true
                // },
                {
                    'rowField':'season',
                    'tblHeader':'Season Name',
                    'show':true
                },
                {
                    'rowField':'status',
                    'tblHeader':'Status',
                    'show':true
                },
                {
                    'rowField':'created_at',
                    'tblHeader':'Created',
                    'show':true
                },
                {
                    'rowField':'delete',
                    'tblHeader':'Delete',
                    'show':true
                },
            
            ];
        
            // create table structure
            res.status(200).send({
                result: 'success',
                data: results,
                columns: columns
            });
        }
    });
};

const addProc = (req, res, next) => {
    let method = req.method;
    let isNew = false;
    let {id, season, status} = req.body;
    const user_id = 1;

    let sql = '';
    let today = new Date();
    const created_at = common.getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    if (method == 'POST') {
        isNew = true;
        sql = sprintfJs.sprintf("INSERT INTO `%s`(`season`, `status`, `created_at`, `user_id`) VALUES ('%s', '%s', '%s', '%s');", config.dbTblName.seasons, season, status, created_at, user_id);
    } else {
        if (id && +id > 0) {
            sql = sprintfJs.sprintf("UPDATE `%s` SET `season`='%s', `status`='%s', `user_id`='%s' WHERE `id`='%s';", config.dbTblName.seasons, season, status, user_id, id);
        } else {
            res.status(200).send({
                result: 'error',
                message: 'Empty update id'
            });
            return;
        }
    }
    
    dbConn.query(sql, null, (error, results, fields) => {
        if (error) {
            res.status(200).send({
                result: 'error',
                message: 'Unknown error',
                error: error,
            });
        } else {
            let msg = 'Successfully saved.';
            if (!isNew) {
                msg = 'Successfully updated.'
            }

            res.status(200).send({
                result: 'success',
                message: msg,
                data: []
            });
        }
    });
};

const deleteProc = (req, res, next) => {
    const params = req.body;
    const seasonId = params.id;

    let sql = sprintfJs.sprintf("DELETE FROM `%s` WHERE `id` = '%d';", config.dbTblName.seasons, seasonId);
    dbConn.query(sql, null, (error, results, fields) => {
        if (error) {
            res.status(200).send({
                result: 'error',
                message: 'Unknown error',
                error: error,
            });
        } else {
            res.status(200).send({
                result: 'success',
                message: 'Successfully deleted',
            });
        }
    });
};

const listProc = (req, res, next) => {
    let status = req.query.status;
    let sql = sprintfJs.sprintf("SELECT `id`, `season`, `status` FROM `%s` ORDER BY `status` ASC;", config.dbTblName.seasons);
    if (+status) {
        sql = sprintfJs.sprintf("SELECT `id`, `season`, `status` FROM `%s` WHERE `status`=%s ORDER BY `status` ASC;", config.dbTblName.seasons, +status);
    }
    dbConn.query(sql, null, (error, results, fields) => {
        if (error) {
            res.status(200).send({
                result: 'error',
                message: 'Unknown error',
                data: [],
            });
        } else {
            res.status(200).send({
                result: 'success',
                data: results
            });
        }
    });
}

router.get('/', indexProc);
router.post('/', addProc);
router.put('/', addProc);
router.delete('/', deleteProc);
router.get('/list', listProc);

export default router;
