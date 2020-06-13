import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import FullEditor from 'ckeditor5-build-full'
import { CustomUploadAdapterPlugin } from './customAdapter'

const index = ({ setEditor }) => {
  return (
    <CKEditor
      editor={FullEditor}
      onInit={editor => setEditor(editor)}
      // onChange={(event, editor) => {
      //   console.log(editor.getData())
      // }}
      config={{
        extraPlugins: [CustomUploadAdapterPlugin]
      }}
    />
  )
}

export default index
