import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
    float: left;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #fff;
    width: ${window.screen.width < 962 ? `44%` : '77%'};
    :focus {
        outline: none;
    }
`;
const Button = styled.button`
    float: left;
    width: 20%;
    min-width: 86px;
    padding: 10px;
    font-size: 16px;
    background-color: #0066ff;
    color: #fff;
    border: 2px solid #0066ff;
    :hover {
        background-color: #003399;
        border: 2px solid #003399;
        cursor: pointer;
    }
    :focus {
        outline: none;
    }
`;

const Form = ({onSubmit}) => {
    const [value, setValue] = useState('');
    const handleChange = (elem) => {
        setValue(elem.target.value);
    };
    const handleSubmit = (elem) => {
        elem.preventDefault();
        if (value !== '') {
            onSubmit(value);
            setValue('');
        }
    };

    return (
        <form>
            <Input
                name="NewItem"
                type="text"
                value={value}
                placeholder="введите задачу"
                onChange={handleChange}
            />
            <Button onClick={handleSubmit}>Добавить</Button>
        </form>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func,
};

export default Form;
