import expect from 'expect';
import { INITIALIZE_FORM, RESET_FORM } from '../../actions/formActions';
import reducer, { getStateKey } from './record';

describe('record reducer', () => {
    it('should return an empty record by default', () => {
        expect(reducer(undefined, { type: 'OTHER_ACTION' })).toEqual({});
    });

    it('should return an empty record upon RESET_FORM', () => {
        expect(reducer({ foo: 'bar' }, { type: RESET_FORM })).toEqual({});
    });

    it('should return the current record with new fields upon INITIALIZE_FORM', () => {
        expect(
            reducer(
                { foo: 'bar' },
                {
                    type: INITIALIZE_FORM,
                    payload: { bar: 'foo', 'deep.very.deep': 'gotme' },
                    meta: { form: 'record-form', resource: 'posts' },
                }
            )
        ).toEqual({
            foo: 'bar',
            [getStateKey('record-form', 'posts')]: {
                bar: 'foo',
                deep: { very: { deep: 'gotme' } },
            },
        });
    });
});
