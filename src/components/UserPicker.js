import React from 'react';
import { default as Select } from 'react-select/async';
import { findUserByName } from '../services/github';


const loadOptions = async (inputValue, callback) => {

    try {
        const data = await findUserByName(inputValue);
        const options = data.map(info => {
            const { name, login } = info;
            if (!login) {
                return undefined;
            }
            let label = login;
            if (name) {
                label = `${label} (${name})`;
            }
            return { value: login, label };
        }).filter(o => !!o);
        callback(options);
    } catch (e) {
        console.error(e);
        callback([]);
    }
};

const handleInput = newValue => {
    if (typeof newValue !== 'string') {
        return "";
    }
    return newValue.replace(/\W/g, '');
}

const UserPicker = (props) => {
    const [username, changeUsername] = React.useState({
        label: props.username,
        value: props.username
    })

    React.useEffect(() => {
        if (props.username === username.value) {
            return;
        }
        props.onChange(username.value)
    }, [props, username]);

    const pickUsername = React.useCallback(option => {
        changeUsername(option);
    }, [changeUsername]);

    return (
        <div id="userPicker">
            <Select
            cacheOptions
            // initialValue={{}}
            loadOptions={loadOptions}
            onInputChange={handleInput}
            onChange={pickUsername}
            placeholder={"find a user lookup repos"}
             />
        </div>
    )
}

export default UserPicker;
