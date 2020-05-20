import {firebaseDatabase} from './firebaseUtils'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {

        let query = firebaseDatabase.ref(nodePath)
                                    .limitToLast(size);
        query.on('value', dataSnapshot => {
            var items = [];
            var item = [];
            dataSnapshot.forEach(childSnapshot => {
                let key = childSnapshot.key;
                let title = childSnapshot.val().title;
                let content = childSnapshot.val().content;
                let created_at = childSnapshot.val().created_at;
                let date = new Date(created_at);
                item.push(key);
                item.push(title);
                item.push(content);
                item.push(date.toLocaleString())
            });
            items.push(item);
            items.reverse();
            callback(items);
        });

        return query;
    };

}