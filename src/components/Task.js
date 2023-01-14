import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { icons } from '../icons';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0;
`;
const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
    text-decoration-line: ${({ completed }) =>
        completed ? 'line-through' : 'none'};
`;

const Task = ({ items, deleteTask, toggleTask }) => {
    return (
        <Container>
            <IconButton
                icon={items.completed ? icons.check : icons.unCheck}
                items={items}
                onPress={toggleTask}
            />
            <Contents completed={items.completed}>{items.text}</Contents>
            <IconButton
                icon={icons.delete}
                items={items}
                onPress={deleteTask}
            />
            {items.completed || <IconButton icon={icons.edit} />}
        </Container>
    );
};

Task.propTypes = {
    items: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default Task;
