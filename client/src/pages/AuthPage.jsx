import React, { useState, useEffect,useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';

const AuthPage = () => {
  const auth=useContext(AuthContext)
  const message = useMessage();
  const { loading, error, request ,clearError} = useHttp();
  
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message,clearError]);

  // Убирает баг с инпутом
  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const [form, setForm] = useState({
    email: '', password: ''
  });

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  const registerHandler = async() => {
    try {
      const data = await request("/api/auth/register", "post", { ...form })
      
      message(data.message)
    } catch (e) {
      
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "post", { ...form })
      auth.login(data.token,data.userId)
    } catch (e) {
      
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage