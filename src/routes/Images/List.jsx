import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Images } from 'queries/images.graphql'
import { getParamValue } from 'utils'

const List = (props) => {
  const searchQuery = getParamValue(props.location, 'search')
  const { loading, error, data } = useQuery(Images)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const images = data.images.data
  return (
    images.map(image => <img key={image.id} src={image.url.raw} alt={image.description} />)
  )
}

export default List
