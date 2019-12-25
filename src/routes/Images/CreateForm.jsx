import React from 'react'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { CreateImage as CreateImageMutation } from 'queries/images.graphql'
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

const CreateForm = (props) => {
  const [createImage] = useMutation(CreateImageMutation, {
    onCompleted: ({ createImage }) => {
      props.history.push(`/images/${createImage.id}`)
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

  return (
    <>
      <Navbar className={classes.navbar}>
        <BlueprintNavbar.Group align={Alignment.LEFT} />
        <BlueprintNavbar.Group align={Alignment.CENTER}>
          <span className='bp3-ui-text bp3-running-text'>
            Enter image details
          </span>
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.RIGHT}>
          <Link to="/" className={appClasses.noUnderline}>
            <Button large icon="cross" />
          </Link>
        </BlueprintNavbar.Group>
      </Navbar>

      <div className={classes.form}>
        <Container>
          <Card elevation={Elevation.TWO}>
            <h3 className="bp3-heading">New image</h3>
            <Spacer vertical />

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

                    {renderTextInput('URL - Raw', 'raw_url', values, handleChange)}
                    {renderTextInput('URL - Small', 'small_url', values, handleChange)}
                    {renderTextInput('URL - Thumb', 'thumb_url', values, handleChange)}

                    <Spacer vertical />

                    <Button large text='Reset' type='reset' onClick={handleReset} />
                    <Spacer horizontal />
                    <Button large text='Create' type='submit' disabled={isSubmittable(values)} onClick={handleSubmit} intent='success' />
                  </form>
                )}
            </Formik>
          </Card>
        </Container>
      </div>
    </>
  )
}

export default CreateForm
