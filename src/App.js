import styled from 'styled-components'
import { useRecoilState } from 'recoil';
import { pageState } from './atoms'
import { GettingStarted } from './components/GettingStarted'
import { Tutorial1 } from './components/Tutorial1'
import { LoadingModels } from './components/LoadingModels/index.js'
import { LoadingTextures } from './components/LoadingTextures'
import { SpringAnimations } from './components/SpringAnimations'
import { VirtualWorld } from './components/VirtualWorld'
import { VirtualWorld2 } from './components/VirtualWorld2'
import { Minecraft } from './components/Minecraft/index.js'

const pages = ["getting-started", "tutorial-1", "loading-models", "loading-textures", "spring-animations", "virtual-world", "virtual-world-2", "minecraft"]

function App() {
  const [page, setPage] = useRecoilState(pageState)

  const renderPage = () => {
    switch(page) {
      case "getting-started":
        return <GettingStarted />
      case "tutorial-1":
        return <Tutorial1 />
      case "loading-models":
        return <LoadingModels />
      case "loading-textures":
        return <LoadingTextures />
      case "spring-animations":
        return <SpringAnimations />
      case "virtual-world":
        return <VirtualWorld />
      case "virtual-world-2":
        return <VirtualWorld2 />
      case "minecraft":
        return <Minecraft />
      default:
        return <div><h1>No Page Selected</h1><p><button onClick={() => setPage("getting-started")}>Reset</button></p></div>
    }
  }

  const handleNavClick = (pageName) => {
    setPage(pageName)
  }

  return (
    <StyledApp className="app-container">
      <div className="page-nav-bar">
        {pages.map((pageName, index) => (
          <button className="nav-button" onClick={() => handleNavClick(pageName)} key={`${index}-${pageName}`}>
            {pageName}
          </button>
        ))}
      </div>
      {renderPage()}
    </StyledApp>
  );
}

const StyledApp = styled.div`
  &.app-container {
    position: relative;
    min-height: 100vh;

    .page-nav-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      height: 60px;
      z-index: 1000;
      background: transparent;
    }

    .nav-button {
      cursor: pointer;
      margin-left: 5px;
      margin-right: 5px;
      padding: 6px 12px;
      border-radius: 4px;
      border: none;
      outline: none;
      background: white;
      transition: .07s ease-in-out;

      &:hover {
        background: rgba(33,33,33,.08);
        transition: .11s ease-in-out;
      }
    }
  }
  #canvas-container {
    height: 100vh; //calc(100vh - 60px);
    width: 100vw;
    /* padding-top: 60px; */
  }
`

export default App;
