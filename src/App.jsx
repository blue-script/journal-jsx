import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Body from './layouts/Body/Body'
import Header from './components/Header/Header'
import JournalList from './components/JournalList/JournalList'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import { useState } from 'react'

const INITIAL_DATA = [
  // {
  //   id: 1,
  //   title: 'Подготовка к обновлению курсов',
  //   date: new Date(),
  //   text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  // },
  // {
  //   id: 2,
  //   title: 'Поход в горы',
  //   date: new Date(),
  //   text: 'Думал что очень много времени.'
  // }
]

function App() {
  const [items, setItems] = useState(INITIAL_DATA)

  const addItem = (item) => {
    setItems(prev => [...prev, {
      id: prev.length > 0
        ? Math.max(...prev.map(i => i.id)) + 1
        : 1,
      title: item.title,
      date: new Date(item.date),
      text: item.post
    }])
  }



  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  )
}

export default App
