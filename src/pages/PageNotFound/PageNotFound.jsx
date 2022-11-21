import { useNavigate } from 'react-router-dom'

import styles from './PageNotFound.module.scss'

const PageNotFound = () => {
  const navigate = useNavigate()

  const goHomeHandler = () => navigate('/')

  return (
    <div className={styles['page-not-found']}>
      <h1>
        The page you are looking for{' '}
        <span className="text-highlighted">{'cannot be found'}</span>
      </h1>
      <button className="btn btn-primary" onClick={goHomeHandler}>
        Back to Home
      </button>
    </div>
  )
}

export default PageNotFound
