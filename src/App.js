import { Canvas } from '@react-three/fiber'
import { useRecoilState } from 'recoil';
import { pageState } from './atoms'
import { GettingStarted } from './components/GettingStarted'

function App() {
  const [page, setPage] = useRecoilState(pageState)

  const renderPage = () => {
    switch(page) {
      case "getting-started":
        return <GettingStarted />
      default:
        return <div>No Page Selected</div>
    }
  }

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default App;
