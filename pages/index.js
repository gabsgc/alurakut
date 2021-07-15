import React from 'react';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

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
              {props.followers.map((followers, i) => {
                if (i < 6) return (
                  <li key={followers.id}>
                    <a href={`https://github.com/${followers.login}`} key={followers}>
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

export default function Home() {
  const githubUser = 'gabsgc';
  const [comunidades, setComunidades] = React.useState([{
    id: '1',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const pessoas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
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
              Bem vindo(a), Gabi
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
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault();
              console.log(e);
              const dadosForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image: dadosForm.get('image'),
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
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
              {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/users/${itemAtual.title}`} key={itemAtual}>
                        <img src={`${itemAtual.image}`} alt={`${itemAtual}`}/>
                        <span>{itemAtual.title}</span>
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
              {pessoas.map((itemAtual) => {
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
