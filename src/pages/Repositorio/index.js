import React, { useState, useEffect} from 'react';
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa'

import {
    Container,
    Owner,
    Loading,
    BackButton,
    IssuesList,
    PageActions,
    FilterList
} from './styles';

export default function Repositorio({ match }) {

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalIssues, setTotalIssues] = useState(0);
    const [state, setState] = useState('open');

    useEffect(() => {
        async function load() {
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const [repositorioData, issuesData] =await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: state,
                        per_page: 5
                    }
                }
                )
            ]);

            console.log(issuesData.data)
            setIssues(issuesData.data);
            setTotalIssues(repositorioData.data.open_issues_count || 0);
            setRepositorio(repositorioData.data);
            setLoading(false);
        }

        load();
    }, [match.params.repositorio, state])

    const totalPages = Math.ceil(totalIssues / 5);

    useEffect(() => {

        async function loadIssue() {
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: state,
                    page: page,
                    per_page: 5,
                },
            });

            setIssues(response.data);

        }

        loadIssue();
    }, [page, state]);

    if(loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    function handlePage(action) {
        setPage(action === 'back' ? page - 1 : page + 1 )
    }

    function handleState(option) {
        switch (option) {
            case 'all':
                setState('all');
                break;

            case 'open':
                setState('open');
                break;

            case 'closed':
                setState('closed');
                break;

            default:
                console.log('e')
        }
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color='#000' size={30} />
            </BackButton>
            <Owner>
            {repositorio.organization && (
                <img 
                    src={repositorio.organization.avatar_url}
                    alt={repositorio.organization.login}
                />
            )}
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            <FilterList>
                <p>State:</p>

                <div>
                    <button
                        type='button'
                        className={`${state === 'all' ? 'usedFilter' : ''}`}
                        onClick={() => handleState('all')}
                    >
                        All
                    </button>

                    <button
                        type='button'
                        className={`${state === 'open' ? 'usedFilter' : ''}`}
                        onClick={() => handleState('open')}
                    >
                        Open
                    </button>

                    <button
                        type='button'
                        className={`${state === 'closed' ? 'usedFilter' : ''}`}
                        onClick={() => handleState('closed')}
                    >
                        Closed
                    </button>
                </div>
            </FilterList>

            <IssuesList>
                {issues.length === 0 ? (
                    <li>
                        <p>Nenhuma issue encontrada.</p>
                    </li>
                ) : (
                    issues.map(issue => (
                        <li key={String(issue.id)}>
                            {issue.user && (
                                <img src={issue.user.avatar_url} alt={issue.user.login}/>
                            )}
                            <div>
                                <strong>
                                    <a href={issue.html_url} target='_blank' rel="noopener noreferrer">
                                        {issue.title}
                                    </a>
                                    {issue.labels && issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}

                                    <div>
                                        {issue.user && <p>{issue.user.login}</p>}
                                        {issue.state && <p>State: <strong>{issue.state}</strong></p>}
                                    </div>
                                </strong>
                            </div>
                        </li>
                    ))
                )}
            </IssuesList>

            <PageActions>
                <button 
                    type='button' 
                    onClick={() => 
                    handlePage('back')}
                    disabled={page < 2}
                >
                    Voltar
                </button>

                <span>Página {page} de {totalPages || 1}</span> {/* <-- aqui */}

                <button 
                    type='button' 
                    onClick={() => 
                    handlePage('next')}
                    disabled={issues.length === 0}
                >
                    Proxima
                </button>

            </PageActions>
        </Container>
    );
}
