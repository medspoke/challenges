import React from 'react'
import PT from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Navbar as BlueprintNavbar,
  Alignment,
  InputGroup
} from "@blueprintjs/core";
import classes from './Navbar.scss'
import { applySearch, selectImageSearch } from 'modules/image/image'

const mapStateToProps = (state) => ({
  searchValue: selectImageSearch(state)
})

const actions = {
  applySearch
}

const Navbar = (props) => {
  const { withSearch, searchValue } = props

  const handleSearch = (searchValue) => {
    props.applySearch(searchValue)
  }

  return (
    <BlueprintNavbar className={classes.navbar}>
      <BlueprintNavbar.Group>
        {withSearch && (
          <InputGroup
              leftIcon="search"
              onChange={({ target }) => handleSearch(target.value)}
              placeholder="Search..."
              // rightElement={maybeSpinner}
              value={searchValue}
          />
        )}
      </BlueprintNavbar.Group>
      <BlueprintNavbar.Group className={classes.heading}>
        <Link to="/"><BlueprintNavbar.Heading>IMAGO</BlueprintNavbar.Heading></Link>
      </BlueprintNavbar.Group>
      <BlueprintNavbar.Group className={classes.actions} align={Alignment.RIGHT}>
        <p>Hello, stranger!</p>
        <BlueprintNavbar.Divider />
        <Button className="bp3-minimal" icon="plus" text="Add image" />
      </BlueprintNavbar.Group>
    </BlueprintNavbar>
  )
}

Navbar.propTypes = {
  withSearch: PT.bool,
  // from connect
  searchValue: PT.string,
}

Navbar.defaultProps = {
  withSearch: false,
  searchValue: '',
}

export default connect(mapStateToProps, actions)(Navbar)
