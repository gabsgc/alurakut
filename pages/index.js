import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr />
      
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )  
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              {props.title} ({props.followers.length})
            </h2>
            <ul>
              {props.followers.slice(0,6).map((followers, i) => {
                return (
                  <li key={followers.id}>
                    <a href={`https://github.com/${followers.login}`} target="_blank">
                      <img src={`${followers.avatar_url}`} alt={`${followers}`}/>
                      <span>{followers.login}</span>
                    </a>
                  </li>    
                )
              })}

            </ul>
    </ProfileRelationsBoxWrapper>

  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);

  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': '4b33f354ce5b07bab07f9d73f278a8',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({"query": `query {
      allCommunities {
        nome
        id
        imagemUrl
        link
      }
    }`})
  })
  .then((response) => response.json())
  .then((respostaCompleta) => {
    const communitiesFromDato = respostaCompleta.data.allCommunities;
    setComunidades(communitiesFromDato);
  })

  const pessoas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]

  // pegar array de dados do github
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch('https://api.github.com/users/gabsgc/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta){
        setSeguidores(respostaCompleta);
      })
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <p>
              Sorte de hoje: "Faça o que você pode, com o que você tem, no lugar onde você está.” – Theodore Roosevelt
            </p>

            <OrkutNostalgicIconSet recados = "12" fotos= "7" videos= "0" fas= "5" mensagens= "7" confiavel="3" legal="3" sexy="2"/>
          </Box>

          <Box>
            <h3 className="subTitle"> 
              O que você deseja fazer?
            </h3>
            <form id="community-form" 
              onSubmit={function handleCreateCommunity(e){
              e.preventDefault();
              const dadosForm = new FormData(e.target);

              const comunidade = {
                nome: dadosForm.get('name'),
                imagemUrl: dadosForm.get('image'),
                link: dadosForm.get('link'),
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })

              document.getElementById('community-form').reset();
            }}>
              <div>
                <input
                  placeholder="Digite o nome da sua comunidade"
                  name="title"
                  aria-label="Digite o nome da sua comunidade"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <div>
                <input
                  placeholder="Informe o link para acessar a sua comunidade"
                  name="link"
                  aria-label="Informe o link para acessar a sua comunidade"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0,6).map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`${itemAtual.link}`} target='_blank'>
                        <img src={`${itemAtual.imagemUrl}`} alt={`${itemAtual.nome}`}/>
                        <span>{itemAtual.nome}</span>
                      </a>
                    </li>
                  )
                })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Seguidores" followers={seguidores}/>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoas.length})
            </h2>
            
            <ul>
              {pessoas.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} alt={`${itemAtual}`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    },
  }
}
