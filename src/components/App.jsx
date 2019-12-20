import React, { Component } from "react"
import PT from 'prop-types'
import styles from '../styles/app.scss'

class App extends Component {
  static propTypes = {
    children: PT.element.isRequired,
  }

  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    )
  }
}

export default App

