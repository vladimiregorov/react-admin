import React from 'react';
import {
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    FormTab,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    PasswordInput,
    ReferenceManyField,
    TabbedForm,
    TextField,
    TextInput,
    translate as withTranslation,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from '../orders/NbItemsField';
import ProductReferenceField from '../products/ProductReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import FullNameField from './FullNameField';
import SegmentsInput from './SegmentsInput';
import { styles, validatePasswords } from './VisitorCreate';

const useStyles = makeStyles(styles);

const VisitorTitle = ({ record }) =>
    record ? <FullNameField record={record} size={32} /> : null;

const VisitorEdit = ({ translate, ...props }) => {
    const classes = useStyles();

    return (
        <Edit {...props} title={<VisitorTitle />}>
            <TabbedForm validate={validatePasswords(translate)}>
                <FormTab label="resources.customers.tabs.identity">
                    <TextInput
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
                <FormTab label="resources.customers.tabs.orders" path="orders">
                    <ReferenceManyField
                        addLabel={false}
                        sort={{ field: 'date', order: 'DESC' }}
                        reference="commands"
                        target="customer_id"
                    >
                        <Datagrid>
                            <DateField source="date" />
                            <TextField source="reference" />
                            <NbItemsField />
                            <NumberField
                                source="total"
                                options={{ style: 'currency', currency: 'USD' }}
                            />
                            <TextField source="status" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
                <FormTab
                    label="resources.customers.tabs.reviews"
                    path="reviews"
                >
                    <ReferenceManyField
                        addLabel={false}
                        sort={{ field: 'date', order: 'DESC' }}
                        reference="reviews"
                        target="customer_id"
                    >
                        <Datagrid filter={{ status: 'approved' }}>
                            <DateField source="date" />
                            <ProductReferenceField />
                            <StarRatingField />
                            <TextField
                                source="comment"
                                cellClassName={classes.comment}
                            />
                            <EditButton style={{ padding: 0 }} />
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
                <FormTab label="resources.customers.tabs.stats" path="stats">
                    <SegmentsInput />
                    <NullableBooleanInput source="has_newsletter" />
                    <DateField
                        source="first_seen"
                        style={{ width: 128, display: 'inline-block' }}
                    />
                    <DateField
                        source="latest_purchase"
                        style={{ width: 128, display: 'inline-block' }}
                    />
                    <DateField
                        source="last_seen"
                        style={{ width: 128, display: 'inline-block' }}
                    />
                </FormTab>
                <FormTab
                    label="resources.customers.tabs.change_password"
                    path="password"
                >
                    <PasswordInput
                        source="password"
                        formClassName={classes.password}
                    />
                    <PasswordInput
                        source="confirm_password"
                        formClassName={classes.confirm_password}
                    />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default withTranslation(VisitorEdit);
