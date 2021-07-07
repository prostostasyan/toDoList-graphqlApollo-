import React, {useEffect} from 'react';
import {deleteData, postData, putData} from '../api/api';
import {useSelector, useDispatch} from 'react-redux';
import Form from './Form';
import ToDoItem from './ToDoItem';
import styled from 'styled-components';
import {
    addItems,
    setError,
    getAsyncItems,
    selectError,
    setCheck,
    selectItems,
    deleteItem,
} from './toDoListSlice';

const ToDoListWrap = styled.div`
    margin-top: 30px;
    display: block;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
`;

const Error = styled.span`
    display: inline-block;
    color: crimson;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 900;
`;

const Ul = styled.ul`
    clear: both;
    list-style: none;
    padding-left: 0;
    width: 100%;
    padding-top: 20px;
`;

function ToDoList() {
    const items = useSelector(selectItems);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsyncItems());
    }, []);

    const addItem = async (text) => {
        const response = await postData('posts', text);
        if (!response.error) {
            const data = response.data.data;
            dispatch(setError(''));
            dispatch(addItems(data));
        } else {
            const err = String(response.error);
            dispatch(setError(err));
        }
    };

    const checkedItem = async (id, state) => {
        const response = await putData(
            'posts',
            id,
            items.find((post) => post.id === id),
            state
        );
        if (!response.error) {
            dispatch(setError(''));
            dispatch(setCheck(id));
        } else {
            const err = String(response.error);
            dispatch(setError(err));
        }
    };

    const deletePost = async (key) => {
        const response = await deleteData('posts', key);
        if (!response.error) {
            dispatch(setError(''));
            dispatch(deleteItem(key));
        } else {
            const err = String(response.error);
            dispatch(setError(err));
        }
    };
    return (
        <ToDoListWrap>
            <Form onSubmit={addItem} />
            {error !== '' && <Error>{error}</Error>}

            <Ul>
                {items.map((item) => (
                    <ToDoItem
                        done={item.done}
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        checkPost={checkedItem}
                        onDelete={deletePost}
                    />
                ))}
            </Ul>
        </ToDoListWrap>
    );
}

export default ToDoList;
