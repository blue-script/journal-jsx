import s from './JournalForm.module.css'
import { useContext, useEffect, useReducer, useRef } from 'react'
import Button from '../Button/Button'
import cn from 'classnames'
import { INITIAL_STATE, formReducer } from './JournalForm.state'
import Input from '../Input/Input'
import { UserContext } from '../../context/user.context'

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const { isValid, isFormReadyToSubmit, values } = formState
  const titleRef = useRef()
  const dateRef = useRef()
  const postRef = useRef()
  const { userId } = useContext(UserContext)

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: 'CLEAR' })
      dispatchForm({
        type: 'SET_VALUE', payload: { userId }
      })
    }
    dispatchForm({
      type: 'SET_VALUE', payload: { ...data }
    })
  }, [data])

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus()
        break
      case !isValid.date:
        dateRef.current.focus()
        break
      case !isValid.post:
        postRef.current.focus()
        break
    }
  }

  useEffect(() => {
    let timerId
    if (!isValid.date || !isValid.post || !isValid.title) {
      timerId = setTimeout(() => {
        focusError(isValid)
        dispatchForm({ type: 'RESET_VALIDITY' })
      }, 1000)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [isValid])

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values, userId)
      dispatchForm({ type: 'CLEAR' })
      dispatchForm({
        type: 'SET_VALUE', payload: { userId }
      })
    }
  }, [isFormReadyToSubmit, onSubmit, values, userId])

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE', payload: { userId }
    })
  }, [userId])

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE', payload: {
        [e.target.name]: e.target.value
      }
    })
  }

  const addJournalItem = (e) => {
    e.preventDefault()
    dispatchForm({ type: 'SUBMIT' })
  }

  const deleteJournalItem = () => {
    onDelete(data.id)
    dispatchForm({ type: 'CLEAR' })
    dispatchForm({
      type: 'SET_VALUE', payload: { userId }
    })
  }

  return (
    <form className={s['journal-form']} onSubmit={addJournalItem}>
      <div className={s.title_container}>
        <Input
          type="text"
          name="title"
          ref={titleRef}
          isValid={isValid.title}
          value={values.title}
          onChange={onChange}
          appearance='title'
        />
        {data?.id &&
          <button
            className={s['delete']}
            type='button'
            onClick={deleteJournalItem}
          >
            <img
              src="/public/archive.svg"
              alt="archive icon"
            />
          </button>
        }
      </div>
      <div className={s['wrapper_date_tag']}>
        <div className={s['form-row']}>
          <label htmlFor="date" className={s['form-label']}>
            <img src="/public/calendar.svg" alt="calendar icon" />
            <span>Дата</span>
          </label>
          <Input
            type="date"
            name="date"
            ref={dateRef}
            isValid={isValid.date}
            id="date"
            value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
            onChange={onChange}
          />
        </div>
        <div className={s['form-row']}>
          <label htmlFor="tag" className={s['form-label']}>
            <img src="/public/folder.svg" alt="folder icon" />
            <span>Метки</span>
          </label>
          <Input
            type="text"
            name="tag"
            id="tag"
            value={values.tag}
            onChange={onChange}
          />
        </div>
      </div>
      <textarea
        name="post"
        ref={postRef}
        rows={10}
        value={values.post}
        onChange={onChange}
        className={
          cn(s['input'],
            { [s['invalid']]: !isValid.post }
          )}
      >
      </textarea>
      <Button>Сохранить</Button>
    </form>
  )
}

export default JournalForm