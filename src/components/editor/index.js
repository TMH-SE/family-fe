import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import FullEditor from 'ckeditor5-build-full'
import { CustomUploadAdapterPlugin } from './customAdapter'

const index = ({ setEditor, initialValue }) => {
  // console.log(initialValue, 'editor11')
  return (
    <CKEditor
      editor={FullEditor}
      onInit={editor => setEditor(editor)}
      data={initialValue || ''}
      // onChange={(event, editor) => {
      //   console.log(editor.getData(), 'data')
      // }}
      config={{
        extraPlugins: [CustomUploadAdapterPlugin]
      }}
    />
  )
}

export default index
