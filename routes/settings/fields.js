import express from 'express';
import config from '../../core/config';
import dbConn from '../../core/dbconn';
import common from '../../core/common';
import sprintfJs from 'sprintf-js';
import db from '../../core/db';

const router = express.Router();

const indexProc = (req, res, next) => {
    const params = req.query;
    let columns = [
        { 'rowField': 'select', 'tblHeader': 'Select', 'show': true },
        // { 'rowField': 'id', 'tblHeader': 'ID', 'show': true },
        { 'rowField': 'title', 'tblHeader': 'Title', 'show': true, 'router':true, 'routerProp':'id' },
        { 'rowField': 'resource', 'tblHeader': 'Resource', 'show': true },
        // { 'rowField': 'cate_num', 'tblHeader': 'Categories', 'show': true },
        { 'rowField': 'category', 'tblHeader': 'Categories', 'show': true },
        { 'rowField': 'registration', 'tblHeader': 'Registration', 'show':false },
        { 'rowField': 'entrant_read_access', 'tblHeader': 'Entrant read access', 'show':false },
        { 'rowField': 'entrant_write_access', 'tblHeader': 'Entrant write access', 'show':false },
        { 'rowField': 'file_types', 'tblHeader': 'Files types', 'show':false },
        { 'rowField': 'required', 'tblHeader': 'Required', 'show':false },
        { 'rowField': 'searchable', 'tblHeader': 'Searchable', 'show':false },
        { 'rowField': 'season_name', 'tblHeader': 'Season', 'show': false },
        { 'rowField': 'field_type', 'tblHeader': 'Field Type', 'show': true },
        { 'rowField': 'conditional', 'tblHeader': 'Conditional on', 'show':false },
        { 'rowField': 'order', 'tblHeader': 'Order', 'show':false },
        { 'rowField': 'updated_at', 'tblHeader': 'Updated', 'show': true },
        { 'rowField': 'created_at', 'tblHeader': 'Created_at', 'show': true },
        { 'rowField': 'data_protection', 'tblHeader': 'Data protection' },
        { 'rowField': 'help_text', 'tblHeader': 'Help text', 'show':false },
        { 'rowField': 'hint_text', 'tblHeader': 'Hint text', 'show':false },
        { 'rowField': 'label', 'tblHeader': 'Label', 'show':false },
        { 'rowField': 'max_charactors', 'tblHeader': 'Maximum chracters', 'show':false },
        { 'rowField': 'max_file_size', 'tblHeader': 'Maximum file size', 'show':false },
        { 'rowField': 'max_words', 'tblHeader': 'Maximum words', 'show':false },
        { 'rowField': 'min_charactors', 'tblHeader': 'Minimum chracters', 'show':false },
        { 'rowField': 'min_words', 'tblHeader': 'Minimum words', 'show':false },
        { 'rowField': 'option_values', 'tblHeader': 'Option Values', 'show':false },
        { 'rowField': 'option_text', 'tblHeader': 'Option Text', 'show':false }
    ];

    let sql = "SELECT A.*, C.`category` " + 
        "FROM `%s` A " + 
        "LEFT JOIN `%s` C ON A.`category_id` = C.`id` ";

    sql = sprintfJs.sprintf(sql, config.dbTblName.fields, config.dbTblName.categories);

    const filterStr = common.getFilter(params, 'title', 'A');
    if (filterStr) {
        sql += sprintfJs.sprintf(" WHERE %s ORDER BY `id` DESC;", filterStr);
    } else {
        sql += " ORDER BY `id` DESC;";
    }

    try {
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
                        return res.status(200).send({
                            result: 'error',
                            message: 'Unknown error',
                            error: error,
                            data: [],
                        });
                    }
    
                    results.forEach(element => {
                        if (element['created_at']) {
                            element['created_at'] = common.getDays(element['created_at']);
                        }
                        if (element['updated_at']) {
                            element['updated_at'] = common.getDays(element['updated_at']);
                        } 
                        if (element['is_allcategories'] == 0) {
                            element['category'] = "All categories";
                            element['category_id'] = [];
                        } else {
                            const ids = element['category_id'].split(",");
                            let arrCate = [];
                            results1.map((e) => {
                                if (ids.indexOf(e['id'] + '') > -1) {
                                    arrCate.push(e['category']);
                                }
                            });

                            element['category'] = arrCate.join(", ");
                            element['category_id'] = ids;
                            
                        }
                    });

                    if (params.id && params.id != 0 && results.length == 1 && results[0]['field_type'] == 'table') {
                        // create table structure
                        let displayColumns = results[0]['display_columns'];
                        if (displayColumns) {
                            displayColumns = displayColumns.split(",");
                        } else {
                            displayColumns = [];
                        }
                        if (displayColumns.length > 2) {
                            
                            sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `field_id` = '%s';", 
                                config.dbTblName.field_table_columns, params.id);
                            dbConn.query(sql, null, (error, results2, fields) => {
                                if (error) {
                                    return res.status(200).send({
                                        result: 'error',
                                        message: 'Unknown error',
                                        error: error,
                                        data: [],
                                    });
                                    
                                }
                                let columnData = {};
                                for (let i = 0; i < results2.length; i++) {
                                    let row1 = results2[i];
                                    columnData[row1['col']] = (({ title, type, is_editable }) => ({ title, type, is_editable }))(row1);
                                }
                                sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `field_id` = '%s' ORDER BY `row`", 
                                    config.dbTblName.field_table_data, params.id);
                                dbConn.query(sql, null, (error, results3, fields) => {
                                    if (error) {
                                        return res.status(200).send({
                                            result: 'error',
                                            message: 'Unknown error',
                                            error: error,
                                            data: [],
                                        });
                                    } 
                                    let rowData = [];
                                    if (results3.length > 0) {
                                        let row0 = results3[0]['row'];
                                        let record = {};
                                        results3.map((ele) => {
                                            if (row0 != ele['row']) {
                                                row0 = ele['row'];
                                                rowData.push(record);
                                                record = {}
                                            }
                                            record[ele['col']] = ele['val'];
                                        });
                                        rowData.push(record);
                                        return res.status(200).send({
                                            result: 'success',
                                            data: results,
                                            displayColumns: displayColumns,
                                            columnData: columnData,
                                            rowData: rowData
                                        });
                                    } else {
                                        return res.status(200).send({
                                            result: 'success',
                                            data: results
                                        });
                                    }
                                });
                            });
                        } else {
                            return res.status(200).send({
                                result: 'success',
                                data: results
                            });
                        }
                    } else {
                        return res.status(200).send({
                            result: 'success',
                            data: results,
                            columns: columns
                        });
                    }
                    
                });
            }
        });
    } catch (err) {
        res.status(200).send({
            result: 'error',
            message: 'Unknown error',
            error: err,
        });
    }   
}

const addProc = async (req, res, next) => {
    const method = req.method;
    let today = new Date();
    let { data, displayColumns, columnData, rowData, id, updateTable } = req.body;
    const created_at = common.getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    let user_id = 1;

    data.updated_at = created_at;
    data.user_id = user_id;
    if (data.is_allcategories == 0) {
        data.category_id = 0;
    } else {
        data.category_id = data.category_id.join();
    }

    let isTable = false;
    if (data.field_type == 'table' && displayColumns && displayColumns.length > 2) {
        // if (method == 'POST') {
        //     isTable = true;
        // } else {
        //     isTable = true;
        // }
        isTable = true;
        data.display_columns = displayColumns.join();
    }

    let sql = "";
    if (method == 'POST') {
        data.created_at = created_at;
        sql = sprintfJs.sprintf("INSERT INTO `%s` SET ?", config.dbTblName.fields);
    } else {
        sql = sprintfJs.sprintf( "UPDATE `%s` SET ? WHERE ?", config.dbTblName.fields );
        if (!id) {
            res.status(200).send({
                result: 'error',
                message: 'empty ID'
            });
            return;
        }
        data = [data, {id : id}];
    }

    try {

        let result = await db.query(sql, data);
        let msg = 'Successfully saved.';
        if (method == 'POST') {
            id = result['insertId'];
        }
        if (isTable) {
            let column_data = [];
            let row_data = [];
 
            Object.keys(columnData).forEach(key=>{
                if (displayColumns.indexOf(key) > -1) {
                    column_data.push([id, key, columnData[key]['title'], columnData[key]['type'], columnData[key]['is_editable']]);
                }
            });
            rowData.map((ele, ind) => {
                Object.keys(ele).forEach(key=>{
                    if (displayColumns.indexOf(key) > -1) {
                        row_data.push([id, ind, key, ele[key]]);
                    }
                });
            });
            
            sql = sprintfJs.sprintf("DELETE FROM `%s` WHERE `field_id` = '%d';", config.dbTblName.field_table_columns, id);
            await db.query(sql, null);
            sql = sprintfJs.sprintf("DELETE FROM `%s` WHERE `field_id` = '%d';", config.dbTblName.field_table_data, id);
            await db.query(sql, null);

            sql = sprintfJs.sprintf("INSERT INTO `%s`(`field_id`, `col`, `title`, `type`, `is_editable`) VALUES ?", config.dbTblName.field_table_columns);
            await db.query(sql, [column_data]);

            sql = sprintfJs.sprintf("INSERT INTO `%s`(`field_id`, `row`, `col`, `val`) VALUES ?", config.dbTblName.field_table_data);
            await db.query(sql, [row_data]);
            
            res.status(200).send({
                result: 'success',
                message: msg,
                data: []
            });

        } else {
            res.status(200).send({
                result: 'success',
                message: msg,
                data: []
            });
        }
    } catch (err) {
        res.status(200).send({
            result: 'error',
            message: 'Unknown error',
            error: err,
        });
    }
}

const updateProc = (req, res, next) => {
    if (!req.body.id) {
        res.status(200).send({
            result: 'error',
            message: 'empty ID'
        });
        return;
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
    let sql = sprintfJs.sprintf("SELECT `id`, `title` FROM `%s` WHERE `is_deleted` = 0;", config.dbTblName.fields);
    let del  = req.query.del;
    if (+del) {
        sql = sprintfJs.sprintf("SELECT `id`, `title` FROM `%s` WHERE `is_deleted` = %s;", config.dbTblName.fields, +del);
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
        return res.status(200).send({
            result: 'error',
            message: 'There is no selected ID'
        });
    }

    let today = new Date();
    const created_at = common.getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    let user_id = 1;

    let sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `id` in (?);", config.dbTblName.fields);
    try {
        let results = await db.query(sql,[ids]);
        sql = sprintfJs.sprintf("INSERT INTO `%s` SET ?;", config.dbTblName.fields);
        for (let i = 0; i < results.length; i++) {
            let ele = results[i];
            delete ele['id'];
            ele['title'] = ele['title'] + ' (copy)';
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
        return res.status(200).send({
            result: 'error',
            message: 'There is no selected ID'
        });
    }

    let sql = sprintfJs.sprintf("UPDATE `%s` SET is_deleted = 1 WHERE `id` in (?);", config.dbTblName.fields);
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
router.put('/update', addProc);
router.delete('/delete', deleteProc);

export default router;