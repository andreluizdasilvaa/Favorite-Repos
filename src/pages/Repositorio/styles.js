import styled from "styled-components";
import { PrimaryColor, SecondaryColor } from "../../styles/colors";
import { Link } from "react-router-dom";

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1 {
        font-size: 30px;
        color: ${PrimaryColor};
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`;

export const Loading = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;

        & + li {
            margin-top: 12px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 1px solid ${PrimaryColor};
        }

        div {
            flex: 1;
            margin-left: 12px;

            p {
                margin-top: 10px;
                font-size: 12px;
                color: #000;
                font-weight: lighter;
            }
        }

        strong {
            font-size: 15px;

            a {
                text-decoration: none;
                color: #222;
                transition-duration: 0.3s;

                &:hover {
                    color: ${SecondaryColor};
                }
            }

            span {
                background: #222;
                color: #ddd;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                padding: 4px 7px;
                margin-left: 10px;
            }

        }
    }
    

`;