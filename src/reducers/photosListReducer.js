import * as types from "../constants/actionTypes";

const initialState = {
    photosList: null
};

export default function photosList(state=initialState, action) {
    const {type, payload} = action;

    if (type === types.GET_PHOTOS_LIST) {
        let photosList = payload;

        localStorage.setItem("allPhotosList", JSON.stringify(payload));

        return{
            ...state,
            photosList: photosList
        };
    } else {
        return state
    }
}