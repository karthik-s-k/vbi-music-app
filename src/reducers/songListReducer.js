import * as types from "../constants/actionTypes";

const initialState = {
    songList: null
};

export default function songList(state=initialState, action) {
    const {type, payload} = action;

    if (type === types.GET_ALBUMS_LIST) {
        let songList = payload;

        return{
            ...state,
            songList: songList
        };
    } else {
        return state
    }
}