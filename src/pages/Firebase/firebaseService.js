import {firebaseDatabase} from './firebaseUtils'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {

        let query = firebaseDatabase.ref(nodePath)
                                   .limitToLast(size);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val().title;
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

}