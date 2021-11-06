import axios from 'axios'
import { ApiView } from 'components/ApiView'
import React from 'react'
import { createClient } from '~/core/client'
import { allControllers } from '~/core/controllers'

const client = createClient(axios)('https://api.innei.ren/v2')
client.injectControllers(allControllers)

axios.interceptors.response.use(
  (r) => r,
  (err) => {
    console.log('err:')
    console.dir(err)
    return Promise.reject(err)
  },
)
function App() {
  return (
    <div className="App">
      <ApiView apiCallFn={() => client.post.getList(1, 1)} desc="Post List" />
      <ApiView
        apiCallFn={() =>
          client.post.getPost(
            'website',
            'host-an-entire-Mix-Space-using-Docker',
          )
        }
        desc="Single Post"
      />

      <ApiView apiCallFn={() => client.post.getLatest()} desc="Latest Post" />
      {/* Note */}
      <ApiView apiCallFn={() => client.note.getLatest()} desc="Latest Note" />
      <ApiView
        apiCallFn={() => client.note.getMiddleList('6166c860035bf29e2c32ec40')}
        desc="Middle List of Note"
      />
      <ApiView
        apiCallFn={() => client.note.likeIt('6166c860035bf29e2c32ec40')}
        desc="Like Note"
      />

      <ApiView apiCallFn={() => client.note.getList(1, 5)} desc="Note List" />
    </div>
  )
}

export default () => <App />
