import { createSelector } from 'reselect';
import { getRecord as getRecordFromState} from '../reducer';

const getDefaultValues = (data = {}, defaultValue = {}, defaultValues = {}) => {
    const globalDefaultValue =
        typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    return { ...globalDefaultValue, ...defaultValues, ...data };
};

const getRecord = (state, props) => props.record;
const getDefaultValue = (state, props) => props.defaultValue;
const getDefaultValuesFromState = (state, props) => getRecordFromState(props.form, props.resource)(state);

export default createSelector(
    getRecord,
    getDefaultValue,
    getDefaultValuesFromState,
    (record, defaultValue, defaultValues) =>
        getDefaultValues(record, defaultValue, defaultValues)
);
