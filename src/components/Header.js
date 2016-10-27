import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from 'header.css'

const Header = ({ name, color }) => (
  <header className={styles.header}>
    <span className={styles.icon} style={color}>{ }</span>
    <span className={styles.identity}>{name}</span>
  </header>
)

Header.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    name: state.name,
    color: state.color,
  }
}

export default connect(mapStateToProps)(Header)
