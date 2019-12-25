import React from 'react'
import PT from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { useQuery } from '@apollo/react-hooks'
import { Images } from 'queries/images.graphql'
import { Container, ImageCard, Navbar } from 'ui-kit'
import { Link } from 'react-router-dom'
import {
  Alignment,
  Button,
  Icon,
  InputGroup,
  Navbar as BlueprintNavbar,
} from "@blueprintjs/core"
import { selectImageSearch, saveImageIds, applySearch } from 'modules/image/image'
import logoImage from 'images/logo.svg'
import classes from './List.scss'
import appClasses from 'styles/app.scss'

const mapStateToProps = (state) => ({
  searchValue: selectImageSearch(state)
})

const actions = {
  saveImageIds,
  applySearch
}

const List = ({ searchValue, saveImageIds, history, applySearch }) => {
  const handleSearch = (searchValue) => {
    applySearch(searchValue)
  }

  const { loading, error, data } = useQuery(Images, {
    variables: { source: 'unsplash', page: 1, perPage: 80, search: searchValue },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const images = data.images.data
  if (images.length) saveImageIds(map(images, 'id')) // save image ids to the redux store
  return (
    <>
      <Navbar>
        <BlueprintNavbar.Group align={Alignment.LEFT}>
          <InputGroup
            leftIcon="search"
            onChange={({ target }) => handleSearch(target.value)}
            placeholder="Search..."
            // rightElement={maybeSpinner}
            value={searchValue}
          />
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.CENTER}>
          <Link to="/">
            <img src={logoImage} />
          </Link>
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.RIGHT}>
          <span className="bp3-text-small bp3-text-muted">Hello, stranger!</span>
          <BlueprintNavbar.Divider />
          <Link to="/images/new" className={appClasses.noUnderline}>
            <Button icon={<Icon icon="add" iconSize={14} />} text="Add image" />
          </Link>
        </BlueprintNavbar.Group>
      </Navbar>
      <Container transparent>
        <h4 className="bp3-heading bp3-dark">Browse images</h4>
        <div className={classes.list}>
          {images.map(image => (
            <ImageCard
              key={image.id}
              imageId={image.id}
              imageURL={image.url.raw}
              title={image.author ? `@${image.author.username}` : 'unknown'}
              subtitle={image.description}
              className={classes.item}
              handleClick={() => history.push(`images/${image.id}`)}
            />
          ))}
        </div>
      </Container>
    </>
  )
}

List.propTypes = {
  saveImageIds: PT.func.isRequired,
  searchValue: PT.string,
}

List.defaultProps = {
  searchValue: '',
}


export default connect(mapStateToProps, actions)(List)
