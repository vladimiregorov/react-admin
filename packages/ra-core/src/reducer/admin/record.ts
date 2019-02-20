import { Reducer } from 'redux';
import {
    INITIALIZE_FORM,
    InitializeFormAction,
    RESET_FORM,
    ResetFormAction,
} from '../../actions/formActions';
import set from 'lodash/set';

const initialState = {};

interface State {
    [key: string]: any;
}

type ActionTypes =
    | InitializeFormAction
    | ResetFormAction
    | { type: 'OTHER_ACTION' };

export const getStateKey = (form: string, resource: string) =>
    `${resource}@${form}`;

const recordReducer: Reducer<State> = (
    previousState = initialState,
    action: ActionTypes
) => {
    if (action.type === RESET_FORM) {
        return initialState;
    }

    if (action.type === INITIALIZE_FORM) {
        const stateKey = getStateKey(action.meta.form, action.meta.resource);

        return Object.keys(action.payload).reduce(
            (acc, key) => {
                // Ensure we correctly set default values for path with dot notation
                set(acc, `${stateKey}.${key}`, action.payload[key]);
                return acc;
            },
            { ...previousState }
        );
    }
    return previousState;
};

export const getRecord = (form: string, resource: string) => (state: State) => {
    const stateKey = getStateKey(form, resource);
    return state[stateKey];
};

export default recordReducer;
