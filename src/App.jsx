import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Body from './layouts/Body/Body'
import Header from './components/Header/Header'
import JournalList from './components/JournalList/JournalList'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './hooks/use-localstorage.hook'
import { UserContextProvider } from './context/user.context'
import { useState } from 'react'

function mapItems(items) {
  return !items
    ? []
    : items.map(i => ({ ...i, date: new Date(i.date) }))
}

function App() {
  const [items, setItems] = useLocalStorage('data')
  const [selectedItem, setSelectedItem] = useState(null)

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          ...item,
          id: items && items.length > 0
            ? Math.max(...items.map(i => i.id)) + 1
            : 1,
          date: new Date(item.date)
        }
      ])
    } else {
      setItems([
        ...mapItems(items).map(i => {
          if (i.id === item.id) {
            return { ...item }
          }

          return i
        })
      ])
    }

  }

  const deleteItem = (id) => {
    setItems([...items.filter(i => i.id !== id)])
  }

  const clearForm = () => {
    setSelectedItem(null)
  }

  return (
    <UserContextProvider>
      <div className='app'>
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={clearForm} />
          <JournalList items={mapItems(items)} setSelectedItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm
            onSubmit={addItem}
            data={selectedItem}
            onDelete={deleteItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  )
}

export default App
