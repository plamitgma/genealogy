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
            wifeId,
            husbandId,
            isGenerated,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          });
    };
}