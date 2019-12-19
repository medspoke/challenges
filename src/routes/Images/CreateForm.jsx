import React from 'react'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { CreateImage as CreateImageMutation } from 'queries/images.graphql'
import classes from './Images.scss'
import { FormGroup, InputGroup, TextArea, Button } from "@blueprintjs/core"

const CreateForm = (props) => {
  const [createImage] = useMutation(CreateImageMutation, {
    onCompleted: ({ createImage }) => {
      props.history.push(`/images/${createImage.id}`)
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

  return (
    <div className={classes.formContainer}>
      <h3>New image</h3>
      <Formik
          initialValues={{
            height: '',
            width: '',
            raw_url: '',
            small_url: '',
            thumb_url: '',
            description: '',
          }}
          onSubmit={(values) => createImage({ variables: { data: values } })}
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
              <Button text='Create' type='submit' disabled={isSubmittable(values)} onClick={handleSubmit} intent='success' />
            </form>
        )}
      </Formik>
    </div>
  )
}

export default CreateForm
