import sprintfJs from 'sprintf-js';
import config from './config';

const getFilter = (params, keyField, alias = '') => {
    if (!params) {
        return '';
    }

    if (alias) {
        alias += '.';
    }

    let filters = [];
    if (params.id && params.id != '0') { // id filter
        filters.push(sprintfJs.sprintf("%s`id`='%s'", alias , params.id));
    }

    if (params.season && params.season != '0') { // season id filter
        filters.push(sprintfJs.sprintf("%s`season_id`='%s'", alias, params.season));
    }

    if (params.del) { // is_deleted filter. 0: no deleted, 1: deleted
        filters.push(sprintfJs.sprintf("%s`is_deleted`='%s'", alias, params.del));
    }

    if (params.key) { // keyword filter
        const keyword = '%' + params.key + '%';
        filters.push(sprintfJs.sprintf("%s`%s` LIKE '%s'", alias, keyField, keyword));
    }

    return filters.join(' AND ');
}

const getPagination = (params) => {
    // let defaultPerpage = +config.dbTblName.numPerPage;
    const numPerPage = parseInt(params.npp, 10) || 10;
    const page = parseInt(params.page, 10) || 0;
    const skip = page * numPerPage;

    return [numPerPage, page, skip];
}

const getDays = (dat) => {

    let y, m, d, pastDays;
    let oneday = 24 * 3600 * 1000;
    // [y, m, d] = dat.slice(0, 10).split('-');
    let today = new Date();
    let from = new Date(dat);

    pastDays = Math.round((today.getTime() - from.getTime()) / oneday);
    if (pastDays <= 0) {
        return 'Today';
    } else if (pastDays > 0 &&  pastDays < 30) {
        return pastDays + ' day' + (pastDays > 1 ? 's': '') + ' ago';
    } else {
        const passMonth = Math.floor(pastDays / 30);
        return passMonth + ' month' + (passMonth > 1 ? 's': '') + ' ago';
    } 
}

const getDateStr = (yyyy, mm, dd) => {
    const strDate = sprintfJs.sprintf('%s/%s/%s', ('0' + mm).slice(-2), ('0' + dd).slice(-2), yyyy);
    return strDate;
}

export default {
    getFilter,
    getPagination,
    getDays,
    getDateStr
}