import styled from 'styled-components'
import { useRecoilState } from 'recoil';
import { Suspense, lazy } from 'react'
import { pageState } from './atoms'

const pages = [
  "getting-started",
  "tutorial-1",
  "loading-models",
  "loading-textures",
  "spring-animations",
  "virtual-world",
  "virtual-world-2",
  "minecraft",
  "spaceted",
  "scroll-boxes",
  "box-outlines",
  "scroll-images",
  "scroll-intersect",
]

function App() {
  const [page, setPage] = useRecoilState(pageState)

  const renderPage = () => {
    switch(page) {
      case "getting-started":
        const GettingStarted = lazy(() => import('./components/GettingStarted'))
        return <GettingStarted />
      case "tutorial-1":
        const Tutorial1 = lazy(() => import('./components/Tutorial1'))
        return <Tutorial1 />
      case "loading-models":
        const LoadingModels = lazy(() => import('./components/LoadingModels/LoadingModels'))
        return <LoadingModels />
      case "loading-textures":
        const LoadingTextures = lazy(() => import('./components/LoadingTextures'))
        return <LoadingTextures />
      case "spring-animations":
        const SpringAnimations = lazy(() => import('./components/SpringAnimations'))
        return <SpringAnimations />
      case "virtual-world":
        const VirtualWorld = lazy(() => import('./components/VirtualWorld'))
        return <VirtualWorld />
      case "virtual-world-2":
        const VirtualWorld2 = lazy(() => import('./components/VirtualWorld2'))
        return <VirtualWorld2 />
      case "minecraft":
        const Minecraft = lazy(() => import('./components/Minecraft/Minecraft'))
        return <Minecraft />
      case "spaceted":
        const SpaceTed = lazy(() => import('./components/SpaceTed'))
        return <SpaceTed />
      case "scroll-boxes":
        const ScrollBoxes = lazy(() => import('./components/ScrollBoxes'))
        return <ScrollBoxes />
      case "box-outlines":
        const BoxOutlines = lazy(() => import('./components/BoxOutlines'))
        return <BoxOutlines />
      case "scroll-images":
        const ScrollImages = lazy(() => import('./components/ScrollImages'))
        return <ScrollImages />
      case "scroll-intersect":
        const ScrollIntersect = lazy(() => import('./components/ScrollIntersect'))
        return <ScrollIntersect />
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
      <Suspense fallback={null} >
        {renderPage()}
      </Suspense>
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
