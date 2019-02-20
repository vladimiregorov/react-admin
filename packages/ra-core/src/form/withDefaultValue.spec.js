import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';
import { DefaultValue } from './withDefaultValue';

describe('withDefaultValue', () => {
    describe('<DefaultValue />', () => {
        const BaseComponent = () => <div />;

        it('should not initialize the form if no default value', () => {
            const initializeForm = jest.fn();
            shallow(
                <DefaultValue
                    initializeForm={initializeForm}
                    decoratedComponent={BaseComponent}
                    source="title"
                    resource="posts"
                    meta={{ form: 'record-form' }}
                />
            );
            assert.equal(initializeForm.mock.calls.length, 0);
        });
        it('should initialize the form with default value on mount', () => {
            const initializeForm = jest.fn();
            shallow(
                <DefaultValue
                    initializeForm={initializeForm}
                    decoratedComponent={BaseComponent}
                    source="title"
                    resource="posts"
                    meta={{ form: 'record-form' }}
                    defaultValue={2}
                />
            );
            assert.equal(initializeForm.mock.calls.length, 1);
            assert.deepEqual(
                initializeForm.mock.calls[0],
                ['record-form', 'posts', { title: 2 }]
            );
        });
        it('should call initializeForm if a defaultValue changes', () => {
            const initializeForm = jest.fn();
            const wrapper = shallow(
                <DefaultValue
                    initializeForm={initializeForm}
                    decoratedComponent={BaseComponent}
                    source="bar"
                    resource="posts"
                    meta={{ form: 'record-form' }}
                    defaultValue="foo"
                />
            );
            assert.equal(initializeForm.mock.calls.length, 1);
            assert.deepEqual(
                initializeForm.mock.calls[0],
                ['record-form', 'posts', { bar: 'foo' }]
            );

            wrapper.setProps({ defaultValue: 'bar' });

            assert.equal(initializeForm.mock.calls.length, 2);
            assert.deepEqual(
                initializeForm.mock.calls[1],
                ['record-form', 'posts', { bar: 'bar' }]                
            );
        });
    });
});
