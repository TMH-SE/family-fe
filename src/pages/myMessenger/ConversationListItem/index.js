// /* eslint-disable react/prop-types */
// import React, { useEffect } from 'react'
// import shave from 'shave'

// import './ConversationListItem.css'
// import { useHistory } from 'react-router-dom'

// export default function ConversationListItem (props) {
//   const history = useHistory()
//   useEffect(() => {
//     shave('.conversation-snippet', 20)
//   })
//   const { photo, name, text } = props.data
//   return (
//     <div className='conversation-list-item' onClick={() => history.push('/tuinhune/messenger/detail')}>
//       <img className='conversation-photo' src={photo} alt='conversation' />
//       <div className='conversation-info'>
//         <h1 className='conversation-title'>{name}</h1>
//         <p className='conversation-snippet'>{text}</p>
//       </div>
//     </div>
//   )
// }
