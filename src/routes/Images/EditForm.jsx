import React from 'react'
import { Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Image as ImageQuery,
  UpdateImage as UpdateImageMutation
} from 'queries/images.graphql'
import classes from './Images.scss'
import { FormGroup, InputGroup, TextArea, Button } from "@blueprintjs/core"

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

  const renderTextInput = (label, name, values, handleChange, type) => {
    return (
      <FormGroup
        label={label}
        labelFor={name}
      >
        <InputGroup
          type={type}
          name={name}
          onChange={handleChange}
          value={values[name]}
        />
      </FormGroup>
    )
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  console.log(image)
  return (
    <div className={classes.formContainer}>
      <h3>Edit image</h3>
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
            {renderTextInput('Height', 'height', values, handleChange, 'number')}
            {renderTextInput('Width', 'width', values, handleChange, 'number')}
            {renderTextInput('URL - Raw', 'raw_url', values, handleChange)}
            {renderTextInput('URL - Small', 'small_url', values, handleChange)}
            {renderTextInput('URL - Thumb', 'thumb_url', values, handleChange)}
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
            <Button text='Reset' type='reset' onClick={handleReset} />
            <Button text='Update' type='submit' disabled={isSubmittable(values)} onClick={handleSubmit} intent='success' />
          </form>
        )}
      </Formik>
    </div>
  )
}

export default EditForm
