import { allControllers, createClient } from '@mx-space/api-client'
import { axiosAdaptor } from '@mx-space/api-client/esm/adaptors/axios'
import { ApiView } from 'components/ApiView'
import React from 'react'

const axios = axiosAdaptor.default
const client = createClient(axiosAdaptor)('https://api.innei.ren/v2')
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

      {/* Page */}
      <ApiView apiCallFn={() => client.page.getList(1, 10)} desc="List Page" />
      <ApiView
        apiCallFn={() => client.page.getBySlug('about')}
        desc="Get Page By Slug"
      />
      <ApiView
        apiCallFn={() => client.page.getById('5e0318319332d06503619337')}
        desc="Get Page By Id"
      />

      {/* Aggregate */}

      <ApiView
        apiCallFn={() => client.aggregate.getAggregateData()}
        desc="Get Aggregate Data"
      />

      <ApiView apiCallFn={() => client.aggregate.getStat()} desc="Get Stat" />
      <ApiView apiCallFn={() => client.aggregate.getTop()} desc="Get Top" />

      <ApiView
        apiCallFn={() => client.aggregate.getTimeline()}
        desc="Get Timeline"
      />

      {/* Say */}

      <ApiView
        apiCallFn={() => client.say.getAllPaginated(1, 3)}
        desc="Get Say Paginated"
      />
    </div>
  )
}

export default () => <App />
