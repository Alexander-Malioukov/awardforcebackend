import express from 'express';
import config from '../../core/config';
import dbConn from '../../core/dbconn';
import common from '../../core/common';
import sprintfJs from 'sprintf-js';
import db from '../../core/db';

const router = express.Router();

const indexProc = (req, res, next) => {
    const params = req.query;

    let sql = "";
    sql = sprintfJs.sprintf("SELECT A.*, (SELECT category FROM `%s` B WHERE A.`parent_id` = B.`id`) AS parent_cate, S.`season` AS season_name " + 
        "FROM `%s` A, `%s` S WHERE A.`season_id` = S.`id`", config.dbTblName.categories, config.dbTblName.categories, config.dbTblName.seasons);

    const filterStr = common.getFilter(params, 'category', 'A');
    if (filterStr) {
        sql += sprintfJs.sprintf(" AND %s ORDER BY `id` DESC;", filterStr);
    } else {
        sql += " ORDER BY `id` DESC;";
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
                if (element['updated_at']) {
                    element['updated_at'] = common.getDays(element['updated_at']);
                } 
            });

            let columns = [
                {
                    'rowField':'select',
                    'tblHeader':'Select',
                    'show':true
                },
                // {
                //     'rowField':'id',
                //     'tblHeader':'ID',
                //     'show':true
                // },
                {
                    'rowField':'parent_cate',
                    'tblHeader':'Parent',
                    'show':true,
                    'router':true,
                    'routerProp':'parent_id'
                },
                {
                    'rowField':'category',
                    'tblHeader':'Category',
                    'show':true,
                    'router':true,
                    'routerProp':'id'
                },
                {
                    'rowField':'season_name',
                    'tblHeader':'Season',
                    'show':true,
                    'routerProp':'season_id'
                },
                {
                    'rowField':'chapters',
                    'tblHeader':'Chapters',
                    'show':false
                },
                {
                    'rowField':'entries',
                    'tblHeader':'Entries',
                    'show':false
                },
                {
                    'rowField':'divisions',
                    'tblHeader':'Divisions',
                    'show':false
                },
                {
                    'rowField':'created_at',
                    'tblHeader':'Created',
                    'show':true
                },
                {
                    'rowField':'updated_at',
                    'tblHeader':'Updated',
                    'show':true
                },
                {
                    'rowField':'description',
                    'tblHeader':'Description',
                    'show':false
                },
                {
                    'rowField':'short_code',
                    'tblHeader':'Shortcode',
                    'show':false
                },
                {
                    'rowField':'status',
                    'tblHeader':'Status',
                    'show':true
                }
            ];
        
            // create table structure
            res.status(200).send({
                result: 'success',
                data: results,
                columns: columns
            });
        }
    });
}

const addProc = (req, res, next) => {
    let {
        season_id, 
        parent_id, 
        category, 
        description, 
        short_code, 
        status, 
        entries,
        entry_name,
        is_prefilled,
        divisions,
        is_reassigned,
        is_pdfpacking,
        instructions,
    } = req.body;

    let today = new Date();
    const created_at = common.getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    let user_id = 1;

    // sql = sprintfJs.sprintf(
    //     "INSERT INTO `%s`(`season_id`, `parent_id`, `category`, `description`, `short_code`, `status`, `entries`, " + 
    //         "`entry_name`, `is_prefilled`, `divisions`, `is_reassigned`, `is_pdfpacking`, `instructions`, `created_at`, `updated_at`, `user_id) " + 
    //     "VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');", 
    //         config.dbTblName.categories, season_id, parent_id, category, description, short_code, status, entries, 
    //         entry_name, is_prefilled, divisions, is_reassigned, is_pdfpacking, instructions, created_at, updated_at, user_id);
    let sql = sprintfJs.sprintf("INSERT INTO `%s` SET ?", config.dbTblName.categories);
    req.body.created_at = created_at;
    req.body.updated_at = created_at;
    req.body.user_id = user_id;

    dbConn.query(sql, req.body, (error, results, fields) => {
        if (error) {
            res.status(200).send({
                result: 'error',
                message: 'Unknown error',
                error: error,
            });
        } else {
            let msg = 'Successfully saved.';
            
            res.status(200).send({
                result: 'success',
                message: msg,
                data: []
            });
        }
    });
}

const updateProc = (req, res, next) => {
    let {
        id,
        season_id, 
        parent_id, 
        category, 
        description, 
        short_code, 
        status, 
        entries,
        entry_name,
        is_prefilled,
        divisions,
        is_reassigned,
        is_pdfpacking,
        instructions,
    } = req.body;

    if (!req.body.id) {
        res.status(200).send({
            result: 'error',
            message: 'empty ID'
        });
        return
    }

    let today = new Date();
    const updated_at = common.getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const condition = {id : req.body.id};
    req.body.updated_at = updated_at;

    let sql = sprintfJs.sprintf( "UPDATE `%s` SET ? WHERE ?", config.dbTblName.categories );

    dbConn.query(sql, [req.body, condition], (error, results, fields) => {
        if (error) {
            res.status(200).send({
                result: 'error',
                message: 'Unknown error',
                error: error,
            });
        } else {          
            res.status(200).send({
                result: 'success',
                message: 'Successfully updated.'
            });
        }
    });
}

const listProc = (req, res, next) => {
    
    let sql = sprintfJs.sprintf("SELECT `id`, `category`, `parent_id`, `status` FROM `%s` WHERE `is_deleted` = 0;", config.dbTblName.categories);
    let del  = req.query.del;
    if (+del) {
        sql = sprintfJs.sprintf("SELECT `id`, `category`, `parent_id`, `status` FROM `%s` WHERE `is_deleted` = %s;", config.dbTblName.categories, +del);
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
                data: results,
            });
        } 
    });
}

const copyProc = async (req, res, next) => {
    const params = req.body;
    const ids = params.ids;
    if (!ids || ids.length == 0) {
        res.status(200).send({
            result: 'error',
            message: 'There is no selected ID'
        });
        return;
    }

    let today = new Date();
    const created_at = common.getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    let user_id = 1;

    let sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `id` in (?);", config.dbTblName.categories);
    try {
        let results = await db.query(sql,[ids]);
        sql = sprintfJs.sprintf("INSERT INTO `%s` SET ?;", config.dbTblName.categories);
        for (let i = 0; i < results.length; i++) {
            let ele = results[i];
            delete ele['id'];
            ele['category'] = ele['category'] + ' (copy)';
            ele['created_at'] = created_at;
            ele['updated_at'] = created_at;
            ele['user_id'] = user_id;
            await db.query(sql,[ele]);
        }
        res.status(200).send({
            result: 'success',
            message: 'Successfully copied',
        });

    } catch (err) {
        res.status(200).send({
            result: 'error',
            message: 'Unknown error',
            error: err,
        });
    }
}

const deleteProc = (req, res, next) => {
    const params = req.body;
    const ids = params.ids;
    if (!ids || ids.length == 0) {
        res.status(200).send({
            result: 'error',
            message: 'There is no selected ID'
        });
        return;
    }

    let sql = sprintfJs.sprintf("UPDATE `%s` SET is_deleted = 1 WHERE `id` in (?);", config.dbTblName.categories);
    dbConn.query(sql, [ids], (error, results, fields) => {
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
}

router.get('/', indexProc);
router.post('/add', addProc);
router.post('/copy', copyProc);
router.get('/list', listProc);
router.put('/update', updateProc);
router.delete('/delete', deleteProc);


export default router;