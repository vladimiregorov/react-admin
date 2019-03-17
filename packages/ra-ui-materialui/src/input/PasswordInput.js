import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { translate as withTranslation } from 'ra-core';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import TextInput from './TextInput';

const PasswordInput = ({ translate, initiallyVisible, ...rest }) => {
    const [visible, setVisible] = useState(initiallyVisible);

    return (
        <TextInput
            {...rest}
            type={visible ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={translate(
                                'ra.input.password.toggle_visibility'
                            )}
                            onClick={() => setVisible(!visible)}
                        >
                            {visible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

PasswordInput.propTypes = {
    translate: PropTypes.func.isRequired,
    initiallyVisible: PropTypes.bool,
};

PasswordInput.defaultProps = {
    initiallyVisible: false,
};

export default withTranslation(PasswordInput);
