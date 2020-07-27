import { List } from 'immutable';
import React, { useState } from 'react';
import { TagBoxAsync } from 'react-tag-box';
import './styles.scss'

const sampleTags = List(
  ['foo', 'bar', 'baz', 'blitz', 'quux', 'barf', 'balderdash'].map(t => ({
    label: t,
    value: t
  }))
);

const fetch = input => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sampleTags.filter(t => t.label.includes(input)).toJS())
    }, 1500)
  })
}

const TagBox =  () => {
  const [selected, setSelected] = useState(List());

  const onSelect = tag => {
    const newTag = {
      label: tag.label,
      value: tag.value || tag.label
    }

    if (selected.map(t => t.value).includes(newTag.value)) {
      return
    }

    setSelected(selected.push(newTag));
  }

  const remove = tag => {
    setSelected(selected.filter(t => t.value !== tag.value));
  }

  const placeholder = selected.isEmpty() ? '' :
    "Use the backspace key to delete the last tag"   

    return (
      <TagBoxAsync
        fetch={fetch}
        selected={selected.toJS()}
        onSelect={onSelect}
        removeTag={remove}
        backspaceDelete={true}
        placeholder={placeholder}
      />
    )
  
}




export default TagBox;