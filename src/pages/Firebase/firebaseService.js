import {firebaseDatabase, firebaseStorage} from './firebaseUtils'

export default class FirebaseService {

    static getCount = (nodePath, callback) => {
        let query = firebaseDatabase.ref(nodePath);
        query.once('value', dataSnapshot => {
            let count = dataSnapshot.numChildren();
            callback(count);
        });
        return query;
    }

    static getDataList = (nodePath, callback,size = 10) => {

        let query = firebaseDatabase.ref(nodePath)
                                    .limitToLast(size);
        query.once('value', dataSnapshot => {
            var items = [];
            dataSnapshot.forEach(childSnapshot => {
                let key = childSnapshot.key;
                let title = childSnapshot.val().title;
                let content = childSnapshot.val().content;
                let visible = childSnapshot.val().visible;
                let created_at = childSnapshot.val().created_at;
                let slug = childSnapshot.val().slug;
                let date = new Date(created_at);
                firebaseStorage.ref().child(`images/${key}.png`).getDownloadURL()
                .then(function(url) {
                }).catch(function(error) {
                });
                items.push([key, title, content, date.toLocaleString(), visible, slug]);


                
            });
           
            items.reverse();
            callback(items);
        });

        return query;
    };

}