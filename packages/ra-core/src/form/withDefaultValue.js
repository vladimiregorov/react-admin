import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { initializeForm as initializeFormAction } from '../actions/formActions';

export class DefaultValue extends Component {
    static propTypes = {
        decoratedComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
        ]),
        defaultValue: PropTypes.any,
        initializeForm: PropTypes.func.isRequired,
        input: PropTypes.object,
        meta: PropTypes.object,
        source: PropTypes.string,
        resource: PropTypes.string,
        validate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    };

    componentDidMount() {
        const { defaultValue, input } = this.props;
        if (typeof defaultValue === 'undefined' || input) {
            return;
        }
        this.dispatchDefaultValue()
    }

    componentDidUpdate(prevProps) {
        const { defaultValue, input } = this.props;
        if (typeof defaultValue === 'undefined' || input) {
            return;
        }

        if (defaultValue !== prevProps.defaultValue) {
            this.dispatchDefaultValue()
        }
    }

    dispatchDefaultValue = () => {
        const { defaultValue, meta, initializeForm, resource, source } = this.props;

        initializeForm(
            meta.form,
            resource,
            {
            [source]:
                typeof defaultValue === 'function'
                    ? defaultValue()
                    : defaultValue,
            }
        );
}

    render() {
        const { initializeForm, decoratedComponent, ...props } = this.props;
        return createElement(decoratedComponent, props);
    }
}

export default DecoratedComponent =>
    connect(
        () => ({ decoratedComponent: DecoratedComponent }),
        { initializeForm: initializeFormAction }
    )(DefaultValue);
