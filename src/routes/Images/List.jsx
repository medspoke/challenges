import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Images } from 'queries/images.graphql'
import { getParamValue } from 'utils'
import { ImageCard } from 'ui-kit'
import classes from './Images.scss'

const List = (props) => {
  const searchQuery = getParamValue(props.location, 'search')
  const { loading, error, data } = useQuery(Images, {
    variables: { source: 'unsplash', page: 1, perPage: 80 },
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

export default List
