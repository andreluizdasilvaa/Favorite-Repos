import React, { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';

import {
    Title,
    Container,
    Form,
    SubmitButton,
    List,
    DeleteButton
} from './styles';
import api from '../../services/api';

export default function Repositorio() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Buscar repos
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage) {
            setRepositorios(JSON.parse(repoStorage));
        }
    }, [])

    // salvando alterações
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios])

    const handleSubmit = useCallback((e) => {
        async function submit() {
            setLoading(true)
            setAlert(null);
            try {
                e.preventDefault();

                if(!newRepo) {
                    throw new Error('Você precisa indicar um repositório');
                }

                // Verifica se o repositório enviado pelo usuário já existe no array.
                // Caso já exista, a função retorna sem adicionar o repositório novamente.
                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if(hasRepo) {
                    throw new Error('Repositório duplicado')
                }


                const response = await api.get(`repos/${newRepo}`);

                const data = {
                    name: response.data.full_name,
                };

                setRepositorios([...repositorios, data]);
                setNewRepo('');
                console.log(repositorios);
            } catch (error) {
                setAlert(true)
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        
        submit();
    }, [newRepo, repositorios])

    const handleDelete = useCallback((repo) => {
        // esse func vai receber o nome do repo, e em baixo vai receber todos os repos com o nome diferente do que foi passado nessa func
        const find = repositorios.filter(r => r.name !== repo)
        setRepositorios(find);
    }, [repositorios]);

    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    return (
        <Container>
            <h1>
                <FaGithub size={24} />
                Meus repositorios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
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

            <List>
                {repositorios.map((repo, index) => (
                    <li key={index}>
                        
                        <span>
                            <DeleteButton onClick={() => {handleDelete(repo.name)}}>
                                <FaTrash size={20} />
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <a>
                            <FaBars size={20} />
                        </a>
                    </li>
                ))}
            </List>
        </Container>
    );
}
