import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Form.css'
import { useTelegram } from './../../hooks/useTelegram';
import { useCallback } from 'react';

export const Form = () => {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [subject, setSubject] = useState('physical')
  const {tg} = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      subject
    }
    tg.sendData(JSON.stringify(data))
  }, [country, city, subject])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные'
    })
  }, [])

  useEffect(() => {
    if (!city || !country){
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }, [country, city])

  const onChangeCountry = (e) => {
    setCountry(e.target.value)
  }

  const onChangeCity = (e) => {
    setCity(e.target.value)
  }

  const onChangeSubject = (e) => {
    setSubject(e.target.value)
  }

  return (
    <div className='form'>
      <h3>Введите ваши данные</h3>
      <input type="text" placeholder='Страна' className='input' value={country} onChange={onChangeCountry}/>
      <input type="text" placeholder='Город' className='input' value={city} onChange={onChangeCity} />
      <select className='select' value={subject} onChange={onChangeSubject}>
        <option value="physical">Физ. лицо</option>
        <option value="legal">Юр. лицо</option>
      </select>
    </div>
  )
}
