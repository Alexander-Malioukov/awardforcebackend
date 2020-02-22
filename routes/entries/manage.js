import express from 'express';
import config from '../../core/config';
import dbConn from '../../core/dbconn';
import common from '../../core/common';
import sprintfJs from 'sprintf-js';
import db from '../../core/db';

const router = express.Router();
const tabs = [
    {
    id: 1,
    title: "Category Tab 1",
    category_id: [1, 2],
    category: ["Category1", "Category2"],
    field_ids: [1, 2, 3],
    fields: ["checkbox", "checkboxlist", "table"],
    cb_title: "Team Information1",
    content: `<p><strong>You are encouraged to credit all members of the team that contributed to this entry.</strong></p>
                <ol>
                <li>You may also use this space to credit any contributing organisations.</li>
                <li>Email addresses are not required but may be used to arrange delivery of award certificates.</li>
                </ol>`
    },
    {
    id: 2,
    title: "Category 1",
    category_id: "0",
    category: "Category All",
    field_ids: [1, 2, 3],
    fields: ["checkbox", "checkboxlist", "table"],
    cb_title: "Team Information2",
    content: `<p><strong>You are encouraged to credit all members of the team that contributed to this entry.</strong></p>
                <ol>
                <li>Please be sure to spell names correctly and get titles correct. People hate it when their names are misspelt, especially if it appears on an award certificate!</li>
                <li>Email addresses are not required but may be used to arrange delivery of award certificates.</li>
                </ol>`
    }
];
const indexProc = (req, res, next) => {
    const results = tabs;
    res.status(200).send({
        result: 'success',
        data: results
    });
};

const saveProc = async (req, res, next) => {
    let details = req.body.details;
    let tabs = req.body.tabs;
    let isUpdate = false;
    let entry_id = 0;
    if (details.id) {
        isUpdate = true;
        entry_id = details.id;
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

router.get('/', indexProc);
router.get('/:id', indexProc);
router.post('/save', saveProc);
router.post('/save-next', indexProc);
router.post('/save-close', indexProc);

export default router;
