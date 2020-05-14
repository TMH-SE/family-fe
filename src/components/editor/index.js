import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import FullEditor from 'ckeditor5-build-full'
import { CustomUploadAdapterPlugin } from './customAdapter'

const index = () => {
  return (
    <CKEditor
      editor={FullEditor}
      onChange={(event, editor) => {
        console.log(editor)
      }}
      config={{
        extraPlugins: [CustomUploadAdapterPlugin]
      }}
    />
  )
}

export default index
