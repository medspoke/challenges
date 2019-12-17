import React, { PureComponent } from 'react'
import PT from 'prop-types'
import {
  Button,
  Navbar as BlueprintNavbar,
  Alignment,
  InputGroup
} from "@blueprintjs/core";
import classes from './Navbar.scss'

export default class Navbar extends PureComponent {
  static propTypes = {
    withSearch: PT.bool,
  }

  static defaultProps = {
    withSearch: false,
  }

  state = {
    searchValue: ''
  }

  handleSearch = (searchValue) => {
    this.setState({ searchValue })
  }

  render = () => {
    const { withSearch } = this.props
    return (
        <BlueprintNavbar className={classes.navbar}>
          <BlueprintNavbar.Group>
            {withSearch && (
              <InputGroup
                  leftIcon="search"
                  onChange={({ target }) => this.handleSearch(target.value)}
                  placeholder="Search..."
                  // rightElement={maybeSpinner}
                  value={this.state.searchValue}
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
}
