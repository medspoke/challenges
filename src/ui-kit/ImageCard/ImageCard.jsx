import React, { PureComponent } from 'react'
import PT from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Elevation, Icon } from "@blueprintjs/core";
import cx from 'classnames'
import classes from './ImageCard.scss'

class ImageCard extends PureComponent {
  static propTypes = {
    imageURL: PT.string.isRequired,
    title: PT.string.isRequired,
    subtitle: PT.string,
    classNames: PT.string,
    handleClick: PT.func.isRequired,
    imageId: PT.string.isRequired
  }

  static defaultProps = {
    subtitle: null,
    classNames: null,
  }

  render = () => {
    const { imageURL, title, subtitle, classNames, handleClick, imageId, history } = this.props
    const cardClasses = cx(classNames, classes.imageCard)

    return (
      <Card className={cardClasses} interactive elevation={Elevation.TWO}>
        <div className={classes.titleRow}>
          <div className={classes.title}>{title}</div>
          <Icon
            icon="edit"
            className={classes.editIcon}
            iconSize={20}
            interactive={'false'}
            onClick={() => history.push(`/images/${imageId}/edit`)}
          />
        </div>
        <div className={classes.subtitle}>{subtitle}</div>
        <img key={imageURL} src={imageURL} alt={imageURL} onClick={handleClick} />
      </Card>
    )
  }
}

export default withRouter(ImageCard)
