import React, {useEffect, useState} from 'react';
import Form from './Form';
import ToDoItem from './ToDoItem';
import styled from 'styled-components';
import {loader} from 'graphql.macro';
import {useMutation, useQuery} from "@apollo/client";

const GET_POSTS = loader('./../qraphql/GetPosts.graphql');
const DELETE_POST = loader('./../qraphql/DeletePost.graphql');
const UPDATE_POST = loader('./../qraphql/UpdatePost.graphql');
const CREATE_POST = loader('./../qraphql/CreatePost.graphql');


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
    let {loading, error, data, refetch} = useQuery(GET_POSTS, {});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!loading) {
            setPosts(data.posts)
        }
    }, [data])


    const [addItem] = useMutation(CREATE_POST);
    const [deletePost] = useMutation(DELETE_POST);
    const [checkedItem] = useMutation(UPDATE_POST);

    const addPost = (value) => {
        addItem({variables: {description: value}})
            .then(({data}) => {
                    setPosts([...posts, data.createPost])
                }
            )
    }
    const onDelete = (id) => {
        deletePost({variables: {id: +id}})
            .then(() => {
                    let newPosts = posts.filter(elem => +elem.id !== +id);
                    setPosts(newPosts)
                }
            )
    }

    if (loading) return <h2> Loading... </h2>;
    if (error) return <Error> ERROR...: {error} </Error>;

    return (
        <ToDoListWrap>
            <Form
                onSubmit={addPost}
                update={refetch}/>
            <Ul>
                {!loading && posts.map((item) => (
                    <ToDoItem
                        update={refetch}
                        done={item.check}
                        key={+item.id}
                        id={+item.id}
                        text={item.description}
                        checkPost={checkedItem}
                        onDelete={onDelete}
                    />
                ))}
            </Ul>
        </ToDoListWrap>
    );
}

export default ToDoList;
