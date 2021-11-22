const checkUserRegistration = (user_object_cid) => {
    let user_cid_array = [] //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
    let ownercid_ownerleafnodecid_map_array = [] //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
    let creatorcid_creatorleafnodecid_map_array = [] //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
    if (localStorage.getItem("user-cid-array") != null) {    //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
        user_cid_array = JSON.parse(localStorage.getItem("user-cid-array"))
    }
    if (localStorage.getItem("ownercid-ownerleafnodecid-map-array") != null) {    //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
        ownercid_ownerleafnodecid_map_array = JSON.parse(localStorage.getItem("ownercid-ownerleafnodecid-map-array"))
    }
    if (localStorage.getItem("creatorcid_creatorleafnodecid_map_array") != null) {    //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
        creatorcid_creatorleafnodecid_map_array = JSON.parse(localStorage.getItem("creatorcid-creatorleafnodecid-map-array"))
    }
    var count = user_cid_array.length
    for (var i = 0; i < count; i++) {
        if (
            user_cid_array[i].UserCID === user_object_cid
        ) {
            return [
                user_cid_array[i].UserType,
                true, user_cid_array]
        };
    }
    return ["Empty", false, user_cid_array];
}

export default checkUserRegistration;