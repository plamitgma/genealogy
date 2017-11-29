export const SEARCH_PERSON = 'SEARCH_PERSON';

export function searchPerson(data) {
    return (dispatch, getState) => {
        debugger;
        var persons = getState().person.persons;
        dispatch({
            type: SEARCH_PERSON,
            data: {
                currentSearch: data,
                persons: persons.filter(per => per.fullName.toLowerCase().indexOf(data.keyword.toLowerCase()) > -1)
            }
        })
    }
}