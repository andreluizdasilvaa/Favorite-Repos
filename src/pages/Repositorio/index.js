import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

import {
    Container,
    Owner,
    Loading,
    BackButton,
    IssuesList,
    PageActions,
    FilterList,
} from './styles';

export default function Repositorio({ match }) {
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [state, setState] = useState('open');
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const nomeRepo = decodeURIComponent(
                    match.params.repositorio,
                );
                const repositorioData = await api.get(
                    `/repos/${nomeRepo}`,
                );

                setRepositorio(repositorioData.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (
                    error.response &&
                    (error.response.status === 401 ||
                        error.response.status === 403)
                ) {
                    alert(
                        'Limite de requisições da API do GitHub atingido ou token inválido. Por favor, adicione seu token pessoal no arquivo .env baixando o projeto no link: https://github.com/andreluizdasilvaa/Favorite-Repos.',
                    );
                } else {
                    console.error(
                        'Erro ao carregar o repositório',
                    );
                }
            }
        }
        load();
    }, [match.params.repositorio]);

    useEffect(() => {
        async function loadIssue() {
            try {
                const nomeRepo = decodeURIComponent(
                    match.params.repositorio,
                );
                const response = await api.get(
                    `/repos/${nomeRepo}/issues`,
                    {
                        params: {
                            state,
                            page,
                            per_page: 6,
                        },
                    },
                );
                setIssues(response.data.slice(0, 5));
                setHasNextPage(response.data.length > 5);
            } catch (error) {
                setIssues([]);
                setHasNextPage(false);
                if (
                    error.response &&
                    (error.response.status === 401 ||
                        error.response.status === 403)
                ) {
                    alert(
                        'Limite de requisições da API do GitHub atingido ou token inválido. Por favor, adicione seu token pessoal no arquivo .env baixando o projeto no link: https://github.com/andreluizdasilvaa/Favorite-Repos.',
                    );
                } else {
                    console.error(
                        'Erro ao carregar as issues do repositório',
                    );
                }
            }
        }
        loadIssue();
    }, [page, state, match.params.repositorio]);

    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        );
    }

    function handlePage(action) {
        setPage(action === 'back' ? page - 1 : page + 1);
    }

    function handleState(option) {
        switch (option) {
            case 'all':
                setState('all');
                setPage(1);
                break;

            case 'open':
                setState('open');
                setPage(1);
                break;

            case 'closed':
                setState('closed');
                setPage(1);
                break;

            default:
                console.log('e');
        }
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30} />
            </BackButton>
            <Owner>
                {repositorio.organization && (
                    <img
                        src={
                            repositorio.organization
                                .avatar_url
                        }
                        alt={repositorio.organization.login}
                    />
                )}
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
                <p className="repoStars">
                    <FaStar size={18} color="#E3B341" />
                    {repositorio.stargazers_count}
                </p>
            </Owner>

            <FilterList>
                <p>State:</p>

                <div>
                    <button
                        type="button"
                        className={`${state === 'all' ? 'usedFilter' : ''}`}
                        onClick={() => handleState('all')}
                    >
                        All
                    </button>

                    <button
                        type="button"
                        className={`${state === 'open' ? 'usedFilter' : ''}`}
                        onClick={() => handleState('open')}
                    >
                        Open
                    </button>

                    <button
                        type="button"
                        className={`${state === 'closed' ? 'usedFilter' : ''}`}
                        onClick={() =>
                            handleState('closed')
                        }
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
                                <img
                                    src={
                                        issue.user
                                            .avatar_url
                                    }
                                    alt={issue.user.login}
                                />
                            )}
                            <div>
                                <strong>
                                    <a
                                        href={
                                            issue.html_url
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {issue.title}
                                    </a>
                                    {issue.labels &&
                                        issue.labels.map(
                                            label => (
                                                <span
                                                    key={String(
                                                        label.id,
                                                    )}
                                                >
                                                    {
                                                        label.name
                                                    }
                                                </span>
                                            ),
                                        )}

                                    <div>
                                        {issue.user && (
                                            <p>
                                                {
                                                    issue
                                                        .user
                                                        .login
                                                }
                                            </p>
                                        )}
                                        {issue.state && (
                                            <p>
                                                State:{' '}
                                                <strong>
                                                    {
                                                        issue.state
                                                    }
                                                </strong>
                                            </p>
                                        )}
                                    </div>
                                </strong>
                            </div>
                        </li>
                    ))
                )}
            </IssuesList>

            <PageActions>
                <button
                    type="button"
                    onClick={() => handlePage('back')}
                    disabled={page < 2}
                >
                    Voltar
                </button>

                <span>Página {page}</span>

                <button
                    type="button"
                    onClick={() => handlePage('next')}
                    disabled={!hasNextPage}
                >
                    Proxima
                </button>
            </PageActions>
        </Container>
    );
}
