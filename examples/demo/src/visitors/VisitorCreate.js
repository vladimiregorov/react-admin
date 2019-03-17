import React from 'react';
import {
    Create,
    DateInput,
    FormTab,
    LongTextInput,
    TabbedForm,
    TextInput,
    PasswordInput,
    translate as withTranslation,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    birthday: { display: 'inline-block' },
    password: { display: 'inline-block' },
    confirm_password: { display: 'inline-block', marginLeft: 32 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

export const validatePasswords = translate => ({
    password,
    confirm_password,
}) => {
    const errors = {};

    if (password && confirm_password && password !== confirm_password) {
        errors.confirm_password = [
            translate('resources.customers.errors.password_mismatch'),
        ];
    }

    return errors;
};

const useStyles = makeStyles(styles);

const VisitorCreate = ({ translate, ...props }) => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm validate={validatePasswords(translate)}>
                <FormTab label="resources.customers.tabs.identity">
                    <TextInput
                        autoFocus
                        source="first_name"
                        formClassName={classes.first_name}
                    />
                    <TextInput
                        source="last_name"
                        formClassName={classes.last_name}
                    />
                    <TextInput
                        type="email"
                        source="email"
                        validation={{ email: true }}
                        fullWidth={true}
                        formClassName={classes.email}
                    />
                    <DateInput source="birthday" />
                </FormTab>
                <FormTab
                    label="resources.customers.tabs.address"
                    path="address"
                >
                    <LongTextInput
                        source="address"
                        formClassName={classes.address}
                    />
                    <TextInput
                        source="zipcode"
                        formClassName={classes.zipcode}
                    />
                    <TextInput source="city" formClassName={classes.city} />
                </FormTab>
                <FormTab
                    label="resources.customers.tabs.password"
                    path="password"
                >
                    <PasswordInput
                        source="password"
                        formClassName={classes.password}
                        required
                    />
                    <PasswordInput
                        source="confirm_password"
                        formClassName={classes.confirm_password}
                        required
                    />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default withTranslation(VisitorCreate);
