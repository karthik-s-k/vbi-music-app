import * as types from "../constants/actionTypes";

const initialState = {
    songList: null
};

export default function songList(state=initialState, action) {
    const {type, payload} = action;

    if (type === types.GET_ALBUMS_LIST) {
        let songList = payload.filter(i => i.id < 10);

        if(localStorage.getItem("allSongsList")){
            localStorage.removeItem("allSongsList");
        }
        localStorage.setItem("allSongsList", JSON.stringify(songList));

        return{
            ...state,
            songList: songList
        };
    } else {
        return state
    }
}