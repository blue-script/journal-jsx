import { useContext, useMemo } from 'react'
import CardButton from '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'
import './JournalList.css'
import { UserContext } from '../../context/user.context'

function JournalList({ items, setSelectedItem }) {
  const { userId } = useContext(UserContext)

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1
    }
    return -1
  }
  const filteredItems = useMemo(() => items
    .filter(el => el.userId === userId)
    .sort(sortItems), [items, userId])

  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>
  }

  return (
    <div className='journal-list'>
      {filteredItems
        .map(el => (
          <CardButton key={el.id} onClick={() => { setSelectedItem(el) }} >
            <JournalItem
              title={el.title}
              date={el.date}
              post={el.post}
            />
          </CardButton>
        ))}
    </div>
  )
}

export default JournalList