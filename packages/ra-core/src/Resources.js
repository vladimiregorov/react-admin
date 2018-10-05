import { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

const Resources = ({ children, context }) =>
    Children.map(
        children,
        child =>
            child
                ? cloneElement(child, {
                      key: child.props.name,
                      context,
                  })
                : null
    );

Resources.propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.string,
};

export default Resources;
