import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';

import {
    Title,
    Container,
    Form,
    SubmitButton,
} from './styles';
import api from '../../services/api';

export default function Repositorio() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback((e) => {
        async function submit() {
            setLoading(true)
            try {
                e.preventDefault();

                if(!newRepo) {
                    return;
                }

                await new Promise(resolve => setTimeout(resolve, 3000));
                const response = await api.get(`repos/${newRepo}`);

                const data = {
                    name: response.data.full_name,
                };

                setRepositorios([...repositorios, data]);
                setNewRepo('');
                console.log(repositorios);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        
        submit();
    }, [newRepo, repositorios])

    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    return (
        <Container>
            <h1>
                <FaGithub size={24} />
                Meus repositorios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar Repositórios"
                    value={newRepo}
                    onChange={handleInputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {
                    loading ? (
                            <FaSpinner size={14} color='#fff' />
                        ) : (
                            <FaPlus color="#fff" size={14} />
                        )
                    }
                    
                </SubmitButton>
            </Form>
        </Container>
    );
}
