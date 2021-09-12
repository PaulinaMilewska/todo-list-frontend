
import React, { useState, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async (): Promise<any> => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/todo/tasks`);
        const json = await response.json();
        setTasks(json)
        }
        fetchTasks();
    }, [])
    return tasks;
}

export function useDoneTasks() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async (): Promise<any> => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/todo/done-tasks`);
        const json = await response.json();
        setTasks(json)
        }
        fetchTasks();
    }, [])
    return tasks;
}

export function useSortCompleted() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async (): Promise<any> => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/todo/sort-tasks`);
        const json = await response.json();
        setTasks(json)
        }
        fetchTasks();
    }, [])
    return tasks;
}