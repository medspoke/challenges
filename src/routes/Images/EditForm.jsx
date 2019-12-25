import React from 'react'
import { Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Image as ImageQuery,
  UpdateImage as UpdateImageMutation
} from 'queries/images.graphql'
import {
  Container,
  Navbar,
  Spacer,
} from 'ui-kit'
import {
  Alignment,
  Button,
  Card,
  ControlGroup,
  Divider,
  Elevation,
  InputGroup,
  FormGroup,
  Navbar as BlueprintNavbar,
  TextArea,
} from "@blueprintjs/core"
import { Link } from "react-router-dom"
import appClasses from 'styles/app.scss'
import classes from './Images.scss'

const EditForm = (props) => {
  const { loading, error, data } = useQuery(ImageQuery, { variables: { id: props.imageId } })
  const image = data ? data.image : {}


  const [updateImage] = useMutation(UpdateImageMutation, {
    onCompleted: ({ updateImage }) => {
      props.history.push(`/images/${updateImage.id}`)
    }
  })

  const isSubmittable = (values) => !values.height ||
    !values.width ||
    !values.raw_url

  const renderTextInput = (label, name, values, handleChange, type, placeholder = '') => {
    let content = <InputGroup
      type={type}
      name={name}
      onChange={handleChange}
      value={values[name]}
      placeholder={placeholder}
    />

    if (label) {
      content = <FormGroup label={label} labelFor={name}>{content}</FormGroup>
    }

    return content
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <>
      <Navbar className={classes.navbar}>
        <BlueprintNavbar.Group align={Alignment.LEFT} />
        <BlueprintNavbar.Group align={Alignment.CENTER}>
          <span className='bp3-ui-text bp3-running-text'>
            {image.description || 'Untitled image'} — {' '}
            <span className="bp3-text-disabled">by {image.author ? `@${image.author.username}` : 'unknown'}</span>
          </span>
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.RIGHT}>
          <Button
            large
            minimal
            icon="eye-open"
            onClick={() => props.history.push(`/images/${props.imageId}`)}
          />
          <Divider className={"bp3-transparent"} />
          <Link to="/" className={appClasses.noUnderline}>
            <Button large icon="cross" />
          </Link>
        </BlueprintNavbar.Group>
      </Navbar>

      <div className={classes.imageBackground} style={{ 'backgroundImage': `url(${image.url.raw})` }} />

      <div className={classes.form}>
        <Container>
          <Card elevation={Elevation.TWO}>
            <h3 className="bp3-heading">Edit image</h3>
            <Spacer vertical />

            <Formik
              initialValues={{
                height: image.height || '',
                width: image.width || '',
                raw_url: image.url.raw || '',
                small_url: image.url.small || '',
                thumb_url: image.url.thumb || '',
                description: image.description || '',
              }}
              onSubmit={(values) => updateImage({ variables: { id: image.id, data: values } })}
            >
              {({
                values,
                handleChange,
                handleReset,
                handleSubmit,
              }) => (
                  <form onSubmit={handleSubmit}>
                    <FormGroup label='Image size'>
                      <ControlGroup>
                        {renderTextInput(null, 'height', values, handleChange, 'number', 'Height')}
                        {renderTextInput(null, 'width', values, handleChange, 'number', 'Width')}
                      </ControlGroup>
                    </FormGroup>

                    <Spacer vertical />

                    <FormGroup
                      label='Description'
                      labelFor='description'
                    >
                      <TextArea
                        name='description'
                        growVertically
                        fill
                        onChange={handleChange}
                        value={values.description}
                      />
                    </FormGroup>

                    <Spacer vertical />

                    {renderTextInput('URL - Raw', 'raw_url', values, handleChange)}
                    {renderTextInput('URL - Small', 'small_url', values, handleChange)}
                    {renderTextInput('URL - Thumb', 'thumb_url', values, handleChange)}

                    <Spacer vertical />

                    <Button large text='Reset' type='reset' onClick={handleReset} />
                    <Spacer horizontal />
                    <Button large text='Save' type='submit' disabled={isSubmittable(values)} onClick={handleSubmit} intent='success' />
                  </form>
                )}
            </Formik>
          </Card>
        </Container>
      </div>
    </>
  )
}

export default EditForm
