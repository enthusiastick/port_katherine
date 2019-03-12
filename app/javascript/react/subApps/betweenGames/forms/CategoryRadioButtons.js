import React from 'react'
import { FieldArray } from 'formik'

import BgsIcon from '../../../sharedResources/components/BgsIcon'

const categories = [
  { id: 'focus', name: 'Focus' },
  { id: 'lesson', name: 'Lesson' },
  { id: 'skill', name: 'Skill' }
]

const CategoryRadioButtons = ({handleChange, value}) => (
  <fieldset className='fieldset topless'>
    <legend>Select type:</legend>
    <FieldArray
      name='category'
      render={arrayHelpers => (
        <div className='row'>
          {categories.map(category => (
            <div className='small-12 medium-4 columns' key={category.id}>
              <div className='text-center'>
                <label>
                  <input
                    className='bottomless'
                    name='category'
                    type='radio'
                    value={category.id}
                    checked={value === category.id}
                    onChange={handleChange}
                  />
                  <BgsIcon category={category.id} /> {category.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    />
  </fieldset>
)

export default CategoryRadioButtons
