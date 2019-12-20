import React from 'react'
import PT from 'prop-types'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { Navbar } from 'ui-kit'
import { Button, Icon, Alignment, Navbar as BlueprintNavbar } from "@blueprintjs/core"
import { Image as ImageQuery } from 'queries/images.graphql'
import { selectPrevImageId, selectNextImageId } from 'modules/image/image'
import cx from 'classnames'
import classes from './Images.scss'
import { Link } from "react-router-dom"

const mapStateToProps = (state, ownProps) => ({
  prevImageId: selectPrevImageId(state, ownProps.imageId),
  nextImageId: selectNextImageId(state, ownProps.imageId)
})

const View = ({ imageId, prevImageId, nextImageId, history }) => {
  const handleControlsClick = (imageId) => {
    history.push(`${imageId}`)
  }
  const renderPrevImageButton = () => {

    if (!prevImageId) return null
    return (<Icon
      icon="chevron-left"
      className={cx(classes.galleryControls, classes.galleryControls__prev)}
      iconSize={20}
      onClick={() => handleControlsClick(prevImageId)}
    />)
  }

  const renderNextImageButton = () => {
    if (!nextImageId) return null
    return (<Icon
      icon="chevron-right"
      className={cx(classes.galleryControls, classes.galleryControls__next)}
      iconSize={20}
      onClick={() => handleControlsClick(nextImageId)}
    />)
  }

  const { loading, error, data } = useQuery(ImageQuery, { variables: { id: imageId } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const image = data.image

  return (
    <>
      <Navbar className={classes.navbar}>
        <BlueprintNavbar.Group>
          <span className={classes.navbarHeading}>{image.description} -- </span>
          <span className={classes.navbarSubheading}> by @{image.author.username}</span>
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.RIGHT}>
          <Link to="/">
            <Button className="bp3-minimal" text="Back" />
          </Link>
        </BlueprintNavbar.Group>
      </Navbar>
      <div className={classes.imageBackground} style={{ 'backgroundImage': `url(${image.url.raw})` }}>
        {renderPrevImageButton()}
        {renderNextImageButton()}
      </div>
    </>
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
