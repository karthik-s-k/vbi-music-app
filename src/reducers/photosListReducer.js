import * as types from "../constants/actionTypes";

const initialState = {
    photosList: null
};

export default function photosList(state=initialState, action) {
    const {type, payload} = action;

    if (type === types.GET_PHOTOS_LIST) {
        let photosList = payload.filter(i => i.id < 10);

        if(localStorage.getItem("allPhotosList")){
            localStorage.removeItem("allPhotosList");
        }
        localStorage.setItem("allPhotosList", JSON.stringify(photosList));

        return{
            ...state,
            photosList: photosList
        };
    } else {
        return state
    }
}