import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { getResources } from './reducer';
import WithPermissions from './auth/WithPermissions';

const RoutesWithLayout = ({
    catchAll,
    children,
    customRoutes,
    dashboard,
    firstResource,
    title,
}) => {
    return (
        <Switch>
            {customRoutes &&
                customRoutes.map((route, index) => (
                    <Route
                        key={index}
                        exact={route.props.exact}
                        path={route.props.path}
                        component={route.props.component}
                        render={route.props.render}
                        children={route.props.children} // eslint-disable-line react/no-children-prop
                    />
                ))}
            {children}
            {dashboard ? (
                <Route
                    exact
                    path="/"
                    render={routeProps => (
                        <WithPermissions
                            authParams={{
                                route: 'dashboard',
                            }}
                            {...routeProps}
                            render={props => createElement(dashboard, props)}
                        />
                    )}
                />
            ) : firstResource ? (
                <Route
                    exact
                    path="/"
                    render={() => <Redirect to={`/${firstResource}`} />}
                />
            ) : null}
            <Route
                render={() =>
                    createElement(catchAll, {
                        title,
                    })
                }
            />
        </Switch>
    );
};

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);

RoutesWithLayout.propTypes = {
    catchAll: componentPropType,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    firstResource: PropTypes.string,
};

const mapStateToProps = state => ({
    firstResource: getResources(state)[0].name,
});

export default withRouter(
    connect(
        mapStateToProps,
        {}
    )(RoutesWithLayout)
);
