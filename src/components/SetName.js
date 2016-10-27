import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from 'setname.css'
import { setName } from 'actions'

const SetName = ({ dispatch }) => {
  let name;
  let err;
  return (
    <dialog className={styles.dialog}>
      <h>Enter a Screen Name</h>
      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault()
        if (!name.value) return err.style.color = '#D50000'
        dispatch(setName(name.value))
        e.target.parentNode.close()
      }}
      >
        <input className={styles.input} ref={node => name = node} />
        <div className={styles.hide} ref={node => err = node}>Please enter a name</div>
        <button type="submit">Close</button>
      </form>
    </dialog>
  )
}
SetName.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(SetName)
