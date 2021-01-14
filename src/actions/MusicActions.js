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
               function(data) {
                   console.log(data); 
                   songList = data;
               })        

       dispatch({
           type: types.GET_SONGS_LIST,
           payload: songList
       })
   }catch (e) {
       console.log(e)
   }
}