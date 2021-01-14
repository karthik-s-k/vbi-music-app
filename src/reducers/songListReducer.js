import * as types from "../constants/actionTypes";

const initialState = {
    songList: null
};

export default function songList(state=initialState, action) {
    const {type, payload} = action;

    if (type === types.GET_SONGS_LIST) {
        return{
            ...state,
            songList: payload
        };
    } else {
        return state
    }
}