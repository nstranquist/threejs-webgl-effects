import styled from 'styled-components'
import { useRecoilState } from 'recoil';
import { pageState } from './atoms'
import { GettingStarted } from './components/GettingStarted'
import { Tutorial1 } from './components/Tutorial1'

const pages = ["getting-started", "tutorial-1"]

function App() {
  const [page, setPage] = useRecoilState(pageState)

  const renderPage = () => {
    switch(page) {
      case "getting-started":
        return <GettingStarted />
      case "tutorial-1":
        return <Tutorial1 />
      default:
        return <div>No Page Selected</div>
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
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
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

  }
`

export default App;
