import React from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { Images } from 'queries/images.graphql'
import { ImageCard } from 'ui-kit'
import { selectImageSearch } from 'modules/image/image'
import classes from './Images.scss'

const mapStateToProps = (state) => ({
  searchValue: selectImageSearch(state)
})

const List = ({ searchValue }) => {
  const { loading, error, data } = useQuery(Images, {
    variables: { source: 'unsplash', page: 1, perPage: 80, search: searchValue },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const images = data.images.data
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
          />
        ))}
      </div>
  )
}

export default connect(mapStateToProps)(List)
