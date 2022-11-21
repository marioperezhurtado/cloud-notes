import { Link } from 'react-router-dom'

import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>
        Store your notes in the cloud, powered by{' '}
        <span className="text-highlighted">Firebase</span>
      </h1>
      <div>
        <a
          className="btn btn-secondary"
          href="https://firebase.google.com/docs"
          target="_blank"
          rel="noreferrer">
          Read Firebase Docs
        </a>
        <Link to="/notes" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default Home
