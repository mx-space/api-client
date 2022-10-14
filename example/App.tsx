// import { axiosAdaptor } from '@mx-space/api-client/esm/adaptors/axios'
import { ApiView } from 'components/ApiView'
import ky from 'ky'
import React from 'react'

import { allControllers, createClient } from '@mx-space/api-client'
import { createKyAdaptor } from '@mx-space/api-client/adaptors/ky'
// @ts-ignore
import { umiAdaptor } from '@mx-space/api-client/adaptors/umi-request'

const kyInstance = ky.create({
  hooks: {
    beforeError: [
      (err) => {
        console.dir(err)
        return err
      },
    ],
  },
})

const client = createClient(createKyAdaptor(kyInstance))(
  'https://api.innei.ren/v2',
)

// const axios = axiosAdaptor.default
// const client = createClient(axiosAdaptor)('https://api.innei.ren/v2')
// client.injectControllers(allControllers)

// axios.interceptors.response.use(
//   (r) => r,
//   (err) => {
//     console.log('err:')
//     console.dir(err)
//     return Promise.reject(err)
//   },
// )

const umi = umiAdaptor.default
// const client = createClient(umiAdaptor)('https://api.innei.ren/v2')
client.injectControllers(allControllers)

Object.defineProperty(window, 'client', {
  value: client,
})
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

      <ApiView
        apiCallFn={async () => {
          const res = await client.post.getLatest()
          console.log(res)

          return res
        }}
        desc="Latest Post"
      />
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

      {/* 404 */}
      <ApiView
        apiCallFn={() => client.proxy.posts.a.a.a.a.get()}
        desc="404 Error"
      />
    </div>
  )
}

export default () => <App />
