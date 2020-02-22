import express from 'express';
import config from '../../core/config';
import dbConn from '../../core/dbconn';
import common from '../../core/common';
import sprintfJs from 'sprintf-js';
import db from '../../core/db';

const router = express.Router();

const indexProc = (req, res, next) => {
    const params = req.query;

    let sql = "SELECT A.*, S.`season` as season_name, CB.`cb_title` " + 
        "FROM `%s` A " + 
        "LEFT JOIN `%s` S ON A.`season_id` = S.`id` " +
        "LEFT JOIN `%s` CB ON A.`content_block_id` = CB.`id` ";
    sql = sprintfJs.sprintf(sql, config.dbTblName.tabs, config.dbTblName.seasons, config.dbTblName.content_blocks);

    const filterStr = common.getFilter(params, 'name', 'A');
    if (filterStr) {
        sql += sprintfJs.sprintf(" WHERE %s ORDER BY `id` DESC;", filterStr);
    } else {
        sql += " ORDER BY `id` DESC;";
    }

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
            'rowField':'name',
            'tblHeader':'Name',
            'show':true,
            'router':true,
            'routerProp':'id'
        },
        {
            'rowField':'category',
            'tblHeader':'Category',
            'show':true,
            'router':false,
            'routerProp':'category_id'
        },
        {
            'rowField':'order',
            'tblHeader':'Order',
            'show':false
        },
        {
            'rowField':'type',
            'tblHeader':'Type',
            'show':true
        },
        {
            'rowField':'cb_title',
            'tblHeader':'Content block',
            'show':true,
            'router':true,
            'routerProp':'content_block_id'
        },
        {
            'rowField':'season_name',
            'tblHeader':'Season',
            'show':true,
            'router':true,
            'routerProp':'season_id'
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

    ];

    dbConn.query(sql, null, (error, results, fields) => {
        if (error) {
            res.status(200).send({
                result: 'error',
                message: 'Unknown error',
                error: error,
                data: [],
            });
        } else {      
            sql =  sprintfJs.sprintf("SELECT `id`, `category` FROM `%s`", config.dbTblName.categories);
            dbConn.query(sql, null, (error, results1, fields) => {
                if (error) {
                    res.status(200).send({
                        result: 'error',
                        message: 'Unknown error',
                        error: error,
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
                        if (element['is_allcategories'] == 0) {
                            element['category'] = "All categories";
                        } else {
                            const ids = element['category_id'].split(",");
                            let arrCate = [];
                            results1.map((e) => {
                                if (ids.indexOf(e['id'] + '') > -1) {
                                    arrCate.push(e['category']);
                                }
                            });

                            element['category'] = arrCate.join(", ");
                            
                        }
                    });

                    // create table structure
                    res.status(200).send({
                        result: 'success',
                        data: results,
                        columns: columns
                    });
                }
            });


        }
    });
}

const addProc = (req, res, next) => {
    // cols:  season_id, type, name, is_divider, content_block_id, order, categories
    let today = new Date();
    const created_at = common.getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    let user_id = 1;

    let sql = sprintfJs.sprintf("INSERT INTO `%s` SET ?", config.dbTblName.tabs);
    req.body.created_at = created_at;
    req.body.updated_at = created_at;
    req.body.user_id = user_id;
    if (req.body.is_allcategories == 0) {
        req.body.category_id = 0;
    } else {
        req.body.category_id = req.body.category_id.join();
    }
    
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
    if (req.body.is_allcategories == 0) {
        req.body.category_id = 0;
    } else {
        req.body.category_id = req.body.category_id.join();
    }

    let sql = sprintfJs.sprintf( "UPDATE `%s` SET ? WHERE ?", config.dbTblName.tabs );

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

    let sql = sprintfJs.sprintf("SELECT `id`, `name`, `season_id`, `category_id`, `type` FROM `%s` WHERE `is_deleted` = 0;", config.dbTblName.tabs);
    let del  = req.query.del;
    if (+del) {
        sql = sprintfJs.sprintf("SELECT `id`, `name`, `season_id`, `category_id`, `type` FROM `%s` WHERE `is_deleted` = %s;", config.dbTblName.tabs, +del);
    }
    if (req.query.season) {
        sql = sprintfJs.sprintf("SELECT `id`, `name`, `season_id`, `category_id`, `type` FROM `%s` WHERE `season_id` = %s;", config.dbTblName.tabs, req.query.season);
    }
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

    let sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `id` in (?);", config.dbTblName.tabs);
    try {
        let results = await db.query(sql,[ids]);
        sql = sprintfJs.sprintf("INSERT INTO `%s` SET ?;", config.dbTblName.tabs);
        for (let i = 0; i < results.length; i++) {
            let ele = results[i];
            delete ele['id'];
            ele['name'] = ele['name'] + ' (copy)';
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

    let sql = sprintfJs.sprintf("UPDATE `%s` SET is_deleted = 1 WHERE `id` in (?);", config.dbTblName.tabs);
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