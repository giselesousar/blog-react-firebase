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

                let post = {
                    key: childSnapshot.key,
                    title: childSnapshot.val().title,
                    content: childSnapshot.val().content,
                    visible: childSnapshot.val().visible,
                    created_at: (new Date(childSnapshot.val().created_at)).toString().replace("GMT-0300 (Horário Padrão de Brasília)", ''),
                    slug: childSnapshot.val().slug
                }
                /**
                firebaseStorage.ref().child(`images/${key}.png`).getDownloadURL()
                .then(function(url) {
                }).catch(function(error) {
                });
                 */
                items.push(post);
                
            });
           
            items.reverse();
            callback(items);
        });

        return query;
    };

}