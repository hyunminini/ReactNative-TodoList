import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, useWindowDimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import InputTest from './components/InputTest.js';
import { theme } from './theme.js';
import Task from './components/Task.js';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    width: 100%;
    align-items: flex-end;
    padding: 0 20px;
`;

const List = styled.ScrollView`
    flex: 1;
    /* width: 100%; */
    width: ${({ width }) => width - 40}px;
`;

export default function App() {
    const width = useWindowDimensions().width;
    const [newTask, setNewTask] = useState('');
    const tempData = {
        1: { id: 1, text: 'ReactNative', completed: false },
        2: { id: 2, text: '아 배고프다', completed: true },
        3: { id: 3, text: '아사직전', completed: false },
    };

    const [tasks, setTasks] = useState(tempData);

    const addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };
        setNewTask('');
        setTasks({ ...tasks, ...newTaskObject });
    };

    const deleteTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    const toggleTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Title>Todo</Title>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={theme.background}
                />
                <InputTest
                    placeholder='+ Add a Task'
                    value={newTask}
                    onChangeText={(text) => setNewTask(text)}
                    onSubmitEditing={addTask}
                />
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map((items) => (
                            <Task
                                key={items.id}
                                items={items}
                                deleteTask={deleteTask}
                                toggleTask={toggleTask}
                            />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}
