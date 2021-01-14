import * as types from '../constants/actionTypes';


export const getAllSongsList = () => async dispatch => {
    let songList = [];

    try{
         await fetch(types.BASE_URL + "albums")
           .then(
               function(response) {
                   return response.json();
               }
           )
           .then(
               function(Data) {  
                   songList = Data;           
               })
        dispatch({
            type: types.GET_SONGS_LIST,
            payload: songList
        });  

    }catch (e) {
        console.log(e)
    }
}

export const getAllPhotosList = () => async dispatch => {
    let photosList = [];

    try{
         await fetch(types.BASE_URL + "photos")
           .then(
               function(response) {
                   return response.json();
               }
           )
           .then(
               function(Data) {  
                photosList = Data;           
               })
        dispatch({
            type: types.GET_PHOTOS_LIST,
            payload: photosList
        });  

    }catch (e) {
        console.log(e)
    }
}