import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage, } from '../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const message = useMessage();

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.id)
        } catch (e) {}
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                name="email"
                                placeholder="Введите email" 
                                type="text" 
                                className="yellow-input"
                                onChange={changeHandler}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                name="password"
                                placeholder="Введите пароль" 
                                type="password"
                                className="yellow-input"
                                onChange={changeHandler}/>
                                <label htmlFor="password">Пароль</label>
                            </div>
                        
                        </div>
                        <div>
                            <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                            >
                                Войти
                            </button>
                            <button 
                            className="btn grey black-text"
                            onClick={registerHandler}
                            disabled={loading}
                            >
                                Регистрация
                            </button>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    )
}