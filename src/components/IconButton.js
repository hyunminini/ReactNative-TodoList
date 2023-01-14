import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { icons } from '../icons';

const Icon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 10px;
    tint-color: ${({ theme, completed }) =>
        completed ? theme.done : theme.text};
`;

const IconButton = ({ icon, onPress, items }) => {
    const _onPress = () => {
        onPress(items.id);
        console.log(items);
    };
    return (
        <TouchableOpacity onPress={_onPress}>
            <View>
                <Icon source={icon} completed={items.completed}></Icon>
            </View>
        </TouchableOpacity>
    );
};

IconButton.defaultProps = {
    items: { completed: false },
};

IconButton.propTypes = {
    icon: PropTypes.oneOf(Object.values(icons)).isRequired,
    onPress: PropTypes.func,
    items: PropTypes.object,
};

export default IconButton;
