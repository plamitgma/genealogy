export function addPerson(person) {
    return (dispatch) => {
        firebase.database().ref('person').push({
            fullName,
            calledName,
            gender,
            dateOfBirth,
            address,
            phone,
            dateOfDeath,
            positionInFamily,
            photo,
            parentId,
            husbandWifeInfo,
            isGenerated,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          });
    };
}