import s from './JournalForm.module.css'
import { useState } from 'react'
import Button from '../Button/Button'
import cn from 'classnames'

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    post: true,
    date: true
  })

  const addJournalItem = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    let isFormValid = true
    if (!formProps.title.trim().length) {
      setFormValidState(state => ({ ...state, title: false }))
      isFormValid = false
    } else {
      setFormValidState(state => ({ ...state, title: true }))
    }
    if (!formProps.post.trim().length) {
      setFormValidState(state => ({ ...state, post: false }))
      isFormValid = false
    } else {
      setFormValidState(state => ({ ...state, post: true }))
    }
    if (!formProps.date) {
      setFormValidState(state => ({ ...state, date: false }))
      isFormValid = false
    } else {
      setFormValidState(state => ({ ...state, date: true }))
    }
    if (!isFormValid) return
    onSubmit(formProps)
  }


  return (
    <form className={s['journal-form']} onSubmit={addJournalItem}>
      <div className={s.title_container}>
        <input type="text" name="title" className={
          cn(s['input-title'],
            { [s['invalid']]: !formValidState.title }
          )}
        />

        <img src="/public/archive.svg" alt="archive icon" />
      </div>

      <div className={s['wrapper_date_tag']}>
        <div className={s['form-row']}>
          <label htmlFor="date" className={s['form-label']}>
            <img src="/public/calendar.svg" alt="calendar icon" />
            <span>Дата</span>
          </label>
          <input type="date" name="date" id="date" className={
            cn(s['input'],
              { [s['invalid']]: !formValidState.date }
            )}
          />
        </div>
        <div className={s['form-row']}>
          <label htmlFor="tag" className={s['form-label']}>
            <img src="/public/folder.svg" alt="folder icon" />
            <span>Метки</span>
          </label>
          <input type="text" name="tag" id="tag" className={
            cn(s['input'])} />
        </div>
      </div>
      <textarea name="post" rows={10} className={
        cn(s['input'],
          { [s['invalid']]: !formValidState.post }
        )}
      >
      </textarea>
      <Button text="Сохранить" />
    </form>
  )
}

export default JournalForm