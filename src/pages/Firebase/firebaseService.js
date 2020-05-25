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
                let date = new Date(created_at);
                var pathReference = firebaseStorage.ref();
                pathReference.child(`images/${key}`).getDownloadURL().then(function(url) {
                    items.push([key, title, content, date.toLocaleString(), visible, url]);
                  }).catch(function(error) {
                    // Handle any errors
                  });
                
            });
           
            items.reverse();
            callback(items);
        });

        return query;
    };

}