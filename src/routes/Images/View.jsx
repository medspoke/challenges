import React from 'react'
import PT from 'prop-types'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { Icon } from "@blueprintjs/core";
import { Image } from 'queries/images.graphql'
import { selectPrevImageId, selectNextImageId } from 'modules/image/image'
import classes from './Images.scss'

const mapStateToProps = (state) => ({
  prevImageId: selectPrevImageId(state, 92),
  nextImageId: selectNextImageId(state, 92)
})

const View = ({ imageId, prevImageId, nextImageId, history }) => {
  const handleControlsClick = (imageId) => {
    history.push(`${imageId}`)
  }
  const { loading, error, data } = useQuery(Image, { variables: { id: imageId } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const image = data.image

  return (
    <div className={classes.imageBackground} style={{ 'backgroundImage': `url(${image.url.raw})` }}>
      <Icon icon="chevron-left" iconSize={20} onClick={() => handleControlsClick(prevImageId)} />
      <Icon icon="chevron-right" iconSize={20} onClick={() => handleControlsClick(nextImageId)} />
    </div>
  )
}


View.propTypes = {
  imageId: PT.string.isRequired,
  prevImageId: PT.string,
  nextImageId: PT.string
}

View.defaultProps = {
  prevImageId: null,
  nextImageId: null,
}


export default connect(mapStateToProps)(View)
