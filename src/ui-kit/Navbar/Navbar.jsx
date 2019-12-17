import React, { useState } from 'react'
import PT from 'prop-types'
import {
  Button,
  Navbar as BlueprintNavbar,
  Alignment,
  InputGroup
} from "@blueprintjs/core";
import classes from './Navbar.scss'

const Navbar = ({ withSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <BlueprintNavbar className={classes.navbar}>
      <BlueprintNavbar.Group>
        {withSearch && (
            <InputGroup
                leftIcon="search"
                onChange={({ target }) => setSearchValue(target.value)}
                placeholder="Search..."
                // rightElement={maybeSpinner}
                value={searchValue}
            />
        )}
      </BlueprintNavbar.Group>
      <BlueprintNavbar.Group className={classes.heading}>
        <BlueprintNavbar.Heading>IMAGO</BlueprintNavbar.Heading>
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
}

Navbar.defaultProps = {
  withSearch: false,
}

export default Navbar
