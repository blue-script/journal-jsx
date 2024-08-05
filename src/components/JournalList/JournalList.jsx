import CardButton from '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'
import './JournalList.css'

function JournalList({ items }) {
  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1
    }
    return -1
  }

  return (
    <div className='journal-list'>
      {items.sort(sortItems).map(el => (
        <CardButton key={el.id}>
          <JournalItem
            title={el.title}
            date={el.date}
            post={el.text}
          />
        </CardButton>
      ))}
    </div>
  )
}

export default JournalList