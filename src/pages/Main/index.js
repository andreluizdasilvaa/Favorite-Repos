import React from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';

import { Title, Container, Form, SubmitButton } from './styles';

export default function Repositorio() {
    return (
        <Container>
            <h1>
                <FaGithub size={24} />
                Meus repositorios
            </h1>

            <Form onSubmit={() => {}}>
                <input type='text' placeholder='Adicionar Repositórios' />

                <SubmitButton>
                    <FaPlus color='#fff' size={14} />
                </SubmitButton>
            </Form>
        </Container>
    )
}
