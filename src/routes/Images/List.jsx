import React from 'react'
import PT from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { useQuery } from '@apollo/react-hooks'
import { Images } from 'queries/images.graphql'
import { ImageCard } from 'ui-kit'
import { selectImageSearch, saveImageIds } from 'modules/image/image'
import classes from './Images.scss'

const mapStateToProps = (state) => ({
  searchValue: selectImageSearch(state)
})

const actions = {
  saveImageIds
}

const List = ({ searchValue, saveImageIds, history }) => {
  const { loading, error, data } = useQuery(Images, {
    variables: { source: 'unsplash', page: 1, perPage: 80, search: searchValue },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const images = data.images.data
  if (images.length) saveImageIds(map(images, 'id')) // save image ids to the redux store
  console.log(images)
  return (
      <div className={classes.imagesContainer}>
        {images.map(image => (
          <ImageCard
            key={image.id}
            imageURL={image.url.small}
            title={`@${image.author.username}`}
            subtitle={image.description}
            classNames={classes.imageItem}
            handleClick={() => history.push(`images/${image.id}`)}
          />
        ))}
      </div>
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
