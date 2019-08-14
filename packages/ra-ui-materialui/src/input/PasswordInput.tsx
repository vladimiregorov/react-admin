import React, { useState, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { InputProps, useTranslate } from 'ra-core';
import { TextFieldProps } from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import TextInput from './TextInput';

interface Props extends InputProps<TextFieldProps> {
    initiallyVisible?: boolean;
}

const PasswordInput: FunctionComponent<Props> = ({
    initiallyVisible,
    ...rest
}) => {
    const translate = useTranslate();
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
    initiallyVisible: PropTypes.bool,
};

PasswordInput.defaultProps = {
    initiallyVisible: false,
};

export default PasswordInput;
