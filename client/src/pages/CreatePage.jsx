import React, { useContext, useState,useEffect } from 'react';
import { useHttp } from '../hooks/http';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { useMessage } from '../hooks/message';

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext)
  const { request } = useHttp();
  const [link, setLink] = useState('');
  const message = useMessage();

  // Убирает баг с инпутом
  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });
        console.log(data);
        history.push(`/detail/${data.link._id}`)
        
      } catch (e) {
        message(e)
      }
    }
  }
  
  return (
    <>
      <div className="row">
        <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
          <div className="input-field">
            <input
              placeholder="Вставьте ссылку"
              id="link"
              type="text"
              value={link}
              onChange={e => setLink(e.target.value)}
              onKeyPress={pressHandler}
            />
            <label htmlFor="link">Введите ссылку</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePage