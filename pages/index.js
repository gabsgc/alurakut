import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
    </Box>
  )  
}

export default function Home() {
  const githubUser = 'gabsgc';
  const pessoas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
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
            <h3 className="subtitle"> 
              O que você deseja fazer?
            </h3>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoas.length})
            </h2>
            
            <ul>
              {pessoas.map((itemAtual) => {
                return (
                  <li>
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
