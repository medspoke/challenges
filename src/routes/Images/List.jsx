import React from 'react'
import PT from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { useQuery } from '@apollo/react-hooks'
import { Images } from 'queries/images.graphql'
import { ImageCard, Navbar } from 'ui-kit'
import { selectImageSearch, saveImageIds, applySearch } from 'modules/image/image'
import classes from './Images.scss'

import { Link } from 'react-router-dom'
import {
  Button,
  Navbar as BlueprintNavbar,
  Alignment,
  InputGroup
} from "@blueprintjs/core"

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
        <BlueprintNavbar.Group>
          <InputGroup
            leftIcon="search"
            onChange={({ target }) => handleSearch(target.value)}
            placeholder="Search..."
            // rightElement={maybeSpinner}
            value={searchValue}
          />
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group className={classes.navbarHeading}>
          <Link to="/"><BlueprintNavbar.Heading>IMAGO</BlueprintNavbar.Heading></Link>
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group className={classes.navbarActions} align={Alignment.RIGHT}>
          <p>Hello, stranger!</p>
          <BlueprintNavbar.Divider />
          <Link to="/images/new">
            <Button className="bp3-minimal" icon="plus" text="Add image" />
          </Link>
        </BlueprintNavbar.Group>
      </Navbar>
      <div className={classes.imagesContainer}>
        {images.map(image => (
          <ImageCard
            key={image.id}
            imageId={image.id}
            imageURL={image.url.small || image.url.raw}
            title={`@${image.author.username}`}
            subtitle={image.description}
            classNames={classes.imageItem}
            handleClick={() => history.push(`images/${image.id}`)}
          />
        ))}
      </div>
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
