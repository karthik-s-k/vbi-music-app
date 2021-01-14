import {combineReducers} from "redux";
import songList from './songListReducer';
import photosList from './photosListReducer';

export default combineReducers({
    songList,
    photosList
})