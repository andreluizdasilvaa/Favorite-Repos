import React, { useState, useEffect} from 'react';
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa'

import styles, {
    Container,
    Owner,
    Loading,
    BackButton
} from './styles';
// 
export default function Repositorio({ match }) {

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const [repositorioData, issuesData] =await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                }
                )
            ]);

            console.log(repositorioData.data)
            setIssues(issuesData.data);
            setRepositorio(repositorioData.data);
            setLoading(false);

        }

        load();
    }, [])

    if(loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color='#000' size={30} />
            </BackButton>
            <Owner>
                <img 
                    src={repositorio.organization.avatar_url} 
                    alt={repositorio.organization.login} 
                />
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>
        </Container>
    );
}
