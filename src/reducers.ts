// src/reducers.js
import {combineReducers} from 'redux';

const states: { isHideBtns: boolean } = {
    isHideBtns: false
}

const rootReducer = combineReducers({
    isHideBtns: (state = states, action) => {
        if (action.type === 'TOGGLE_BTN') {
            return { isHideBtns: !state.isHideBtns};
        }

        return states.isHideBtns;
    }
});

export default rootReducer;
