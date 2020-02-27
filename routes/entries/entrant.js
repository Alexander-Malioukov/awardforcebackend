import express from 'express';
import config from '../../core/config';
import dbConn from '../../core/dbconn';
import common from '../../core/common';
import sprintfJs from 'sprintf-js';

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
            'rowField':'id',
            'tblHeader':'ID',
            'show':true
        },
        {
            'rowField':'entry_name',
            'tblHeader':'Entry ',
            'show':true,
            'router':true,
            'routerProp':'id'
        },
        {
            'rowField':'entrant',
            'tblHeader':'Entrant',
            'show':false,
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
            'show':false,
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
            'show':true
        },
        {
            'rowField':'updated_at',
            'tblHeader':'Updated',
            'show':true
        },
        {
            'rowField':'pdf',
            'tblHeader':'pdf',
            'show':true
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
        }
    });
};

router.get('/list', indexProc);

export default router;
