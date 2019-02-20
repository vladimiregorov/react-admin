import assert from 'assert';
import getDefaultValues from './getDefaultValues';
import { getStateKey } from '../reducer/admin/record';

describe('getDefaultValues', () => {
    const someTitle = 'some value';
    const someTitleFromField = 'some value from field default';

    it('should get defaults values from form correctly', () => {
        const expectedResult = {
            aField: 'aValue',
            title: someTitleFromField,
            nested: {
                title: someTitle,
            },
        };
        const defaultValuesResult = getDefaultValues(
            {
                admin: {
                    record: {
                        [getStateKey('record-form', 'posts')]: { title: someTitleFromField }
                    }
                }
            },
            {
                form: 'record-form',
                resource: 'posts',
                record: { aField: 'aValue' },
                defaultValue: {
                    aField: 'aDefaultValue',
                    title: someTitle,
                    nested: {
                        title: someTitle,
                    },
                },
            }
        );
        assert.deepEqual(defaultValuesResult, expectedResult);
    });

    it('should get defaults values from form correctly when defaultValue is a function', () => {
        const expectedResult = {
            aField: 'aValue',
            title: someTitleFromField,
            nested: {
                title: someTitle,
            },
        };
        const defaultValuesResult = getDefaultValues(
            {
                admin: {
                    record: {
                        [getStateKey('record-form', 'posts')]: { title: someTitleFromField }
                    }
                }
            },
            {
                form: 'record-form',
                resource: 'posts',
                record: { aField: 'aValue' },
                defaultValue: () => ({
                    aField: 'aDefaultValue',
                    title: someTitle,
                    nested: {
                        title: someTitle,
                    },
                }),
            }
        );
        assert.deepEqual(defaultValuesResult, expectedResult);
    });
});
