import express from 'express';
import manageRouter from './manage';
import entrantRouter from './entrant';
import config from '../../core/config';
import dbConn from '../../core/dbconn';
import db from '../../core/db';
import common from '../../core/common';
import sprintfJs from 'sprintf-js';

const detailTabProc = async (req, res, next) => {
    let {tab, season, entry} = req.query;

    if (!tab || !+tab || +tab <= 0) {
        res.status(200).send({
            result: 'error',
            message: 'Invalid Tab Id',
            data: []
        });
        return;
    } 

    let sql;
    if (season && +season && +season > 0) {
        sql = `
            SELECT
                F.id as field_id,
                F.tab_id,
                F.title,
                F.option_text,
                F.option_values,
                F.field_type,
                F.max_charactors,
                F.min_charactors,
                F.max_words,
                F.min_words,
                F.max_file_size,
                F.display_columns,
                T.type as tab_type,
                ETF.entry_id,
                ETF.value
            FROM %s F
            LEFT JOIN %s T ON T.id = F.tab_id
            LEFT JOIN %s ETF ON ETF.entry_id = '%s' AND ETF.tab_id = F.tab_id AND ETF.field_id = F.id
            WHERE F.tab_id = '%s' AND F.season_id = '%s';`;
        sql = sprintfJs.sprintf(sql, config.dbTblName.fields, config.dbTblName.tabs, config.dbTblName.entry_tab_field, entry, tab, season);

    } else if (entry && +entry && +entry > 0) {
        sql = `
            SELECT
                F.id as field_id,
                F.tab_id,
                F.title,
                F.option_text,
                F.option_values,
                F.field_type,
                F.max_charactors,
                F.min_charactors,
                F.max_words,
                F.min_words,
                F.max_file_size,
                F.display_columns,
                T.type as tab_type,
                ETF.entry_id,
                ETF.value
            FROM %s F, %s ETF, %s T
            WHERE ETF.entry_id = '%s' AND ETF.tab_id = F.tab_id AND ETF.field_id = F.id AND T.id = ETF.tab_id AND F.tab_id = '%s';`;
        sql = sprintfJs.sprintf(sql, config.dbTblName.fields, config.dbTblName.entry_tab_field, config.dbTblName.tabs, entry, tab);

    } else {
        res.status(200).send({
            result: 'error',
            message: 'Invalid season id',
            data: []
        });
        return;
    }

    try {
        let results = await db.query(sql, null);
        for (let i = 0; i < results.length; i++) {
            let ele = results[i];
            let columnData = {};
            let rowData = [];
            let entryData = [];
            let displayColumns = [];
            let attachments = [];
            if (ele.field_type == 'table') {
                if (ele['display_columns']) {
                    displayColumns = ele['display_columns'].split(",");
                }

                if (displayColumns.length > 2) {
                    
                    sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `field_id` = '%s';", 
                        config.dbTblName.field_table_columns, ele.field_id);
                    let results2 = await db.query(sql, null);
                    for (let i = 0; i < results2.length; i++) {
                        let row1 = results2[i];
                        columnData[row1['col']] = (({ title, type, is_editable }) => ({ title, type, is_editable }))(row1);
                    }
                    sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `field_id` = '%s' ORDER BY `row`", 
                        config.dbTblName.field_table_data, ele.field_id);
                    let results3 = await db.query(sql, null);
                    if (results3.length > 0) {
                        let row0 = results3[0]['row'];
                        let record = {};
                        results3.map((ele1) => {
                            if (row0 != ele1['row']) {
                                row0 = ele1['row'];
                                rowData.push(record);
                                record = {}
                            }
                            record[ele1['col']] = ele1['val'];
                        });
                        rowData.push(record);
                    }
                    if (entry && +entry && +entry > 0) {
                        sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `entry_id` = '%s' ORDER BY `row`", 
                            config.dbTblName.entry_table, entry);
                        let results4 = await db.query(sql, null);
                        if (results4.length > 0) {
                            let row1 = results4[0]['row'];
                            let record1 = {};
                            results4.map((ele1) => {
                                if (row1 != ele1['row']) {
                                    row1 = ele1['row'];
                                    entryData.push(record1);
                                    record1 = {}
                                }
                                record1[ele1['col']] = ele1['val'];
                            });
                            entryData.push(record1);
                        }
                    }
                }
            }
            
            if (ele.tab_type == 'Attachments' || ele.field_type == 'file') {
                if (entry && +entry && +entry > 0) {
                    sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `entry_id` = '%s' AND `field_id` = '%s' AND `tab_id` = '%s';", 
                        config.dbTblName.entry_attachments, entry, ele.field_id, ele.tab_id);
                    attachments = await db.query(sql, null);
                }
            }
            
            ele['table'] = {
                displayColumns: displayColumns,
                columnData: columnData,
                rowData: rowData,
                entryData: entryData
            }
            ele['attachments'] = attachments;
        }

        let details = [];
        if (entry && +entry > 0) {
            let sql1 = sprintfJs.sprintf("SELECT * FROM `%s` WHERE id = '%s'", config.dbTblName.entries, entry);
            details= await db.query(sql1, null);
        }
        res.status(200).send({
            result: 'success',
            data: {
                fields: results,
                details: details
            }
        });
    } catch(e) {
        res.status(200).send({
            result: 'error',
            message: 'Unknown error',
            error: e,
            data: []
        });
    }
};

const submitProc = (req, res, next) => {
    let {ids, status} = req.body;
    if (!ids || ids.length == 0) {
        res.status(200).send({
            result: 'error',
            message: 'No Ids'
        });
        return;
    }
    if (!status) status = "In Progress";

    let sql = sprintfJs.sprintf("UPDATE `%s` SET status = '%s' WHERE `id` in (?);", config.dbTblName.entries, status);
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
                message: 'Successfully changed as ' + status,
            });
        }
    });
}

const tagsProc = (req, res, next) => {
    let {tags} = req.body;
    if (!tags || tags.length == 0) {
        res.status(200).send({
            result: 'error',
            message: 'No Ids'
        });
        return;
    }
    let sql = '';
    tags.forEach(function (item) {
        sql += sprintfJs.sprintf("UPDATE `%s` SET `tags` = '%s' WHERE `id` = '%s'; ", config.dbTblName.entries, item.tags, item.id);
    });

    // let sql = sprintfJs.sprintf("UPDATE `%s` SET tags = '%s' WHERE `id` in (?);", config.dbTblName.entries, tags);
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
                message: 'Successfully changed tags: ' + tags,
            });
        }
    });
}

const detailProc = (req, res, next) => {
    let entryId = req.params.id;
    if (!entryId || +entryId == 0) {
        res.status(200).send({
            result: 'error',
            message: 'No entry id',
            data: []
        });
        return;
    }

    let sql = sprintfJs.sprintf("SELECT E.*, C.category FROM `%s` E, `%s` C WHERE E.id = '%s' AND C.`id` = E.`category_id`", 
        config.dbTblName.entries, config.dbTblName.categories, entryId);
    dbConn.query(sql, null, (error, results, fields) => {
        if (error) {
            res.status(200).send({
                result: 'error',
                message: 'Unknown error',
                error: error,
                data: []
            });
        } else {
            sql = sprintfJs.sprintf("SELECT E.*, U.full_name FROM `%s` E, `%s` U WHERE E.`entry_id` = '%s' AND U.`id` = E.`entrant_id` ORDER BY E.`id` DESC;", 
                config.dbTblName.entry_comment, config.dbTblName.users, entryId);
            dbConn.query(sql, null, (error, comments, fields) => {
                if (error) {
                    res.status(200).send({
                        result: 'error',
                        message: 'Unknown error',
                        error: error,
                        data: []
                    });
                } else {
                    res.status(200).send({
                        result: 'success',
                        data: results,
                        comments: comments
                    });
                }
            });
            
        }
    });
}

const overviewProc = async (req, res, next) => {
    let entryId = req.params.id;
    if (!entryId || +entryId == 0) {
        res.status(200).send({
            result: 'error',
            message: 'No entry id',
            data: []
        });
        return;
    }

    let sql = "SELECT A.*, S.`season`, C.`category`, U.full_name as entrant " + 
        "FROM `%s` A " + 
        "LEFT JOIN `%s` S ON A.`season_id` = S.`id` " +
        "LEFT JOIN `%s` U ON A.`entrant_id` = U.`id` " +
        "LEFT JOIN `%s` C ON A.`category_id` = C.`id` " + 
        "WHERE A.`id` = '%s'";
    sql = sprintfJs.sprintf(sql, config.dbTblName.entries, config.dbTblName.seasons, config.dbTblName.users, config.dbTblName.categories, entryId);

    let sql1 = `
            SELECT
                F.id as field_id,
                F.tab_id,
                F.title,
                F.field_type,
                F.display_columns,
                ETF.entry_id,
                ETF.value
            FROM %s F, %s ETF 
            WHERE ETF.entry_id = '%s' AND ETF.tab_id = F.tab_id AND ETF.field_id = F.id;`;

    sql1 = sprintfJs.sprintf(sql1, config.dbTblName.fields, config.dbTblName.entry_tab_field, entryId);
    try {
        let details = await db.query(sql, null);
        let results = await db.query(sql1, null);
        for (let i = 0; i < results.length; i++) {
            let ele = results[i];
            let columnData = {};
            let rowData = [];
            let entryData = [];
            let displayColumns = [];
            if (ele.field_type == 'table') {
                if (ele['display_columns']) {
                    displayColumns = ele['display_columns'].split(",");
                }

                if (displayColumns.length > 2) {
                    
                    sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `field_id` = '%s';", 
                        config.dbTblName.field_table_columns, ele.field_id);
                    let results2 = await db.query(sql, null);
                    for (let i = 0; i < results2.length; i++) {
                        let row1 = results2[i];
                        columnData[row1['col']] = (({ title, type, is_editable }) => ({ title, type, is_editable }))(row1);
                    }
                    sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `field_id` = '%s' ORDER BY `row`", 
                        config.dbTblName.field_table_data, ele.field_id);
                    let results3 = await db.query(sql, null);
                    if (results3.length > 0) {
                        let row0 = results3[0]['row'];
                        let record = {};
                        results3.map((ele1) => {
                            if (row0 != ele1['row']) {
                                row0 = ele1['row'];
                                rowData.push(record);
                                record = {}
                            }
                            record[ele1['col']] = ele1['val'];
                        });
                        rowData.push(record);
                    }
                    sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `entry_id` = '%s' ORDER BY `row`", 
                        config.dbTblName.entry_table, entryId);
                    let results4 = await db.query(sql, null);
                    if (results4.length > 0) {
                        let row1 = results4[0]['row'];
                        let record1 = {};
                        results4.map((ele1) => {
                            if (row1 != ele1['row']) {
                                row1 = ele1['row'];
                                entryData.push(record1);
                                record1 = {}
                            }
                            record1[ele1['col']] = ele1['val'];
                        });
                        entryData.push(record1);
                    }
                }
            }
            ele['table'] = {
                displayColumns: displayColumns,
                columnData: columnData,
                rowData: rowData,
                entryData: entryData
            }
        }

        res.status(200).send({
            result: 'success',
            data: {
                fields: results,
                details: details
            }
        });
    } catch(e) {
        res.status(200).send({
            result: 'error',
            message: 'Unknown error',
            error: e,
            data: []
        });
    } 
}

const deleteProc = (req, res, next) => {
    let {ids, del} = req.body;
    if (!ids || ids.length == 0) {
        res.status(200).send({
            result: 'error',
            message: 'No Ids'
        });
        return;
    }
    if (!del) {
        del = 0
    }
    let sql = sprintfJs.sprintf("UPDATE `%s` SET `is_deleted` = '%s' WHERE `id` in (?);", config.dbTblName.entries, del);
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
                message: 'Successfully change as In Progress',
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
    let entrant_id = 1;

    let sql = sprintfJs.sprintf("SELECT * FROM `%s` WHERE `id` in (?);", config.dbTblName.entries);
    try {
        let results = await db.query(sql,[ids]);
        sql = sprintfJs.sprintf("INSERT INTO `%s` SET ?;", config.dbTblName.entries);
        for (let i = 0; i < results.length; i++) {
            let ele = results[i];
            delete ele['id'];
            ele['entry_name'] = ele['entry_name'] + ' (copy)';
            ele['created_at'] = created_at;
            ele['updated_at'] = created_at;
            ele['entrant_id'] = entrant_id;
            ele['is_archived'] = 0;
            ele['is_deleted'] = 0;
            ele['status'] = 'In Progress';
            ele['moderation'] = 'Undecided';
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

const router = express.Router();

router.get('/id/:id', detailProc);
router.get('/detail-tab', detailTabProc);
router.post('/submit', submitProc);
router.post('/delete', deleteProc);
router.post('/copy', copyProc);
router.post('/tags', tagsProc);
router.get('/overview/:id', overviewProc);

router.use('/manage', manageRouter);
router.use('/entrant', entrantRouter);

export default router;