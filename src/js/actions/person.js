export const GET_ALL_PERSON = 'GET_ALL_PERSON';
export const SELECT_CURRENT_PERSON_DASHBOARD = 'SELECT_CURRENT_PERSON_DASHBOARD';

export function addPerson(person) {
    return (dispatch) => {
        if (person.id) {
            var data = {
                ...person,
                updateAt: firebase.database.ServerValue.TIMESTAMP
            };
            delete data.children;
            var updates = {};
            updates['/person/' + person.id] = data;
            firebase.database().ref().update(updates);
        } else {
            // Get a key for a new Post.
            var newPersonId = firebase.database().ref().child('person').push().key;
            var data = {
                id: newPersonId,
                ...person,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                updateAt: firebase.database.ServerValue.TIMESTAMP
            };

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/person/' + newPersonId] = data;
            firebase.database().ref().update(updates);
        }
        dispatch(getAll());
    };
}

export function selectCurrentPerson(data) {
    return dispatch => {
        firebase.database().ref('person').orderByChild('parentId').equalTo(data.id).on("value", function (snapshot) {
            var children = [];
            var result = snapshot.val() || {};
            Object.keys(result).map((key) => {
                children.push(result[key]);
            })
            data.children = children;
            dispatch({
                type: SELECT_CURRENT_PERSON_DASHBOARD,
                data
            })
        });
    }
}

export function getById(id) {
    return dispatch => {
        firebase.database().ref('/person/' + id).once('value').then(function (snapshot) {
            let data = snapshot.val();
            dispatch(selectCurrentPerson(data));
        });
    }
}

export function getAll() {
    return dispatch => {
        var persons = firebase.database().ref('person');
        persons.on('value', (snap) => {
            let data = snap.val() || {};
            let result = [];
            Object.keys(data).map((key) => {
                result.push(data[key]);
            })
            dispatch({
                type: GET_ALL_PERSON,
                data: result
            })
        });
    }
}