import express from 'express';
import config from '../../core/config';
import dbConn from '../../core/dbconn';
import common from '../../core/common';
import sprintfJs from 'sprintf-js';
import db from '../../core/db';

const router = express.Router();
const indexProc = (req, res, next) => {
    const params = req.query;

    let sql = "SELECT A.*, S.`season` as season_name, C.`category`, U.full_name as entrant " + 
        "FROM `%s` A " + 
        "LEFT JOIN `%s` S ON A.`season_id` = S.`id` " +
        "LEFT JOIN `%s` U ON A.`entrant_id` = U.`id` " +
        "LEFT JOIN `%s` C ON A.`category_id` = C.`id` ";
    sql = sprintfJs.sprintf(sql, config.dbTblName.entries, config.dbTblName.seasons, config.dbTblName.users, config.dbTblName.categories);

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
        {
            'rowField':'Action',
            'tblHeader':'Action',
            'show':true
        },
        {
            'rowField':'id',
            'tblHeader':'ID',
            'show':false
        },
        {
            'rowField':'entry_name',
            'tblHeader':'Entry',
            'show':true,
            'router':true,
            'routerProp':'id'
        },
        {
            'rowField':'entrant',
            'tblHeader':'Entrant',
            'show':true,
            'router':true,
            'routerProp':'entant_id'
        },
        {
            'rowField':'category',
            'tblHeader':'Category',
            'show':true,
            'router':true,
            'routerProp':'category_id'
        },
        {
            'rowField':'season_name',
            'tblHeader':'Season',
            'show':true,
            'router':true,
            'routerProp':'season_id'
        },
        {
            'rowField':'status',
            'tblHeader':'Status',
            'show':true
        },
        {
            'rowField':'moderation',
            'tblHeader':'Moderation',
            'show':true
        },
        {
            'rowField':'created_at',
            'tblHeader':'Created',
            'show':false
        },
        {
            'rowField':'updated_at',
            'tblHeader':'Updated',
            'show':false
        }
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
            // create table structure
            res.status(200).send({
                result: 'success',
                data: results,
                columns: columns
            });
            // sql =  sprintfJs.sprintf("SELECT `id`, `category` FROM `%s`", config.dbTblName.categories);
            // dbConn.query(sql, null, (error, results1, fields) => {
            //     if (error) {
            //         res.status(200).send({
            //             result: 'error',
            //             message: 'Unknown error',
            //             error: error,
            //             data: [],
            //         });
            //     } else {

            //         results.forEach(element => {
            //             if (element['created_at']) {
            //                 element['created_at'] = common.getDays(element['created_at']);
            //             }
            //             if (element['updated_at']) {
            //                 element['updated_at'] = common.getDays(element['updated_at']);
            //             } 
            //             if (element['is_allcategories'] == 0) {
            //                 element['category'] = "All categories";
            //             } else {
            //                 const ids = element['category_id'].split(",");
            //                 let arrCate = [];
            //                 results1.map((e) => {
            //                     if (ids.indexOf(e['id'] + '') > -1) {
            //                         arrCate.push(e['category']);
            //                     }
            //                 });

            //                 element['category'] = arrCate.join(", ");
                            
            //             }
            //         });

                   
            //     }
            // });


        }
    });
};

const saveProc = async (req, res, next) => {
    let details = req.body.details;
    let tabs = req.body.tabs;
    let isUpdate = false;
    let entry_id = 0;
    if (req.body.id) {
        isUpdate = true;
        entry_id = req.body.id;
    }

    let today = new Date();
    const created_at = common.getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());

    let sql = sprintfJs.sprintf("INSERT INTO `%s` SET ?", config.dbTblName.entries);
    
    if (!isUpdate) details.created_at = created_at;
    details.updated_at = created_at;

    if (isUpdate) {
        sql = sprintfJs.sprintf( "UPDATE `%s` SET ? WHERE `id` = '%s'", config.dbTblName.entries, entry_id );
    }

    try {
        let results = await db.query(sql, details);
        if (!isUpdate) entry_id = results.insertId;
        let tab_info = [];
        for (let i = 0; i < tabs.length; i ++) {
            let tab = tabs[i];
            if (tab.fields) {
                for (let j = 0; j < tab.fields.length; j ++) {
                    let field = tab.fields[j];
                    tab_info.push([entry_id, field.tab_id, field.field_id, field.value]);
                    if (field.field_type == 'table') {
                        let row_data = [];
                        const displayColumns = field.table.displayColumns;
                        const rowData = field.table.rowData;
                        const field_id = field.field_id;

                        rowData.map((ele, ind) => {
                            Object.keys(ele).forEach(key=>{
                                if (displayColumns.indexOf(key) > -1) {
                                    row_data.push([field_id, ind, key, ele[key]]);
                                }
                            });
                        });
                        
                        sql = sprintfJs.sprintf("DELETE FROM `%s` WHERE `field_id` = '%d';", config.dbTblName.field_table_data, field_id);
                        await db.query(sql, null);

                        sql = sprintfJs.sprintf("INSERT INTO `%s`(`field_id`, `row`, `col`, `val`) VALUES ?", config.dbTblName.field_table_data);
                        await db.query(sql, [row_data]);
                    }
                }
            }
        }
        if (isUpdate) {
            sql = sprintfJs.sprintf("DELETE FROM `%s` WHERE `entry_id` = '%d';", config.dbTblName.entry_tab_field, entry_id);
            await db.query(sql, null);
        }
        
        sql = sprintfJs.sprintf("INSERT INTO `%s`(`entry_id`, `tab_id`, `field_id`, `value`) VALUES ?", config.dbTblName.entry_tab_field);
        await db.query(sql, [tab_info]);

        res.status(200).send({
            result: 'success',
            data: entry_id
        });
    } catch (e) {
        res.status(200).send({
            result: 'error',
            message: 'Unknown Error',
            error: e
        });
    }
}

const moderationProc = (req, res, next) => {
    let {ids, moderation} = req.body;
    if (!ids || ids.length == 0) {
        res.status(200).send({
            result: 'error',
            message: 'No Ids'
        });
        return;
    }
    if (!moderation) moderation = "Undecided";

    let sql = sprintfJs.sprintf("UPDATE `%s` SET moderation = '%s' WHERE `id` in (?);", config.dbTblName.entries, moderation);
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
                message: 'Successfully change moderation status',
            });
        }
    });
}

const archiveProc = (req, res, next) => {
    let {ids, archived} = req.body;
    if (!ids || ids.length == 0) {
        res.status(200).send({
            result: 'error',
            message: 'No Ids'
        });
        return;
    }
    if (!archived) archived = 0;

    let sql = sprintfJs.sprintf("UPDATE `%s` SET `is_archived` = '%s' WHERE `id` in (?);", config.dbTblName.entries, archived);
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
                message: 'Successfully changed archive status',
            });
        }
    });
}


router.get('/list', indexProc);
router.post('/save', saveProc);
router.post('/moderation', moderationProc);
router.post('/archive', archiveProc);

export default router;
