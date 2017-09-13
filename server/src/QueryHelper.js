export class QueryHelper {
    constructor(query) {
        let fieldObject
        Object.keys(query).forEach(field => {
            fieldObject = {};
            switch (field) {
                case 'dateField':
                    fieldObject[query[field]] = {};
                    break;
                case 'from':
                    if (!query['dateField']) {
                        throw new Error('dateField query param is required.');
                    }
                    this[query['dateField']]['$gte'] = new Date(query[field]);
                    break;
                case 'to':
                    if (!query['dateField']) {
                        throw new Error('dateField query param is required.');
                    }
                    this[query['dateField']]['$lt'] = new Date(query[field]);
                    break;
                default:
                    fieldObject[field] = query[field];
                    break;
            }
            Object.assign(this, fieldObject);
        });
    }
} 