import styled from 'styled-components';
import { PrimaryColor } from '../../styles/colors'

export const Title = styled.h1`
    color: red;
`;

export const Container = styled.div `
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;
    padding: 30px;
    margin: 80px auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        
        svg {
            margin-right: 10px;
        }
    }
`;  

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid #ddd;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;;
    }
`;

export const SubmitButton = styled.button`
    background-color: ${PrimaryColor};
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;