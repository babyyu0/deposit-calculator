import { useState } from 'react'
import './App.css'
import Category from './pages/Category'
import Savings from './pages/Savings'
import Deposit from './pages/Deposit'

function App() {
  const [selected, setSelected] = useState("savings")
  const renderContent = () => {
    switch (selected) {
      case "savings":
        return <Savings />
      case "deposit":
        return <Deposit />
      default:
        return <Savings />
    }
  };

  return (
    <>
      <Category setSelected={setSelected} />
      {renderContent()}
    </>
  )
}

export default App
