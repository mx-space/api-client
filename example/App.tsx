import axios from 'axios'
import React, { useEffect } from 'react'
import ReactJson from 'react-json-view'
import { createClient } from '~/core/client'
import { PostClient } from '~/core/clients'
// use the component in your app!

function App() {
  return (
    <div className="App">
      <PostPayload />
    </div>
  )
}

function PostPayload() {
  const [json, setJson] = React.useState<any>({})
  useEffect(() => {
    // for test
    const client = createClient(axios)('https://api.innei.ren/v2')

    client.injectClients(PostClient)

    client.post
      .getPost('website', 'host-an-entire-Mix-Space-using-Docker')
      .then((res) => {
        setJson(res)
      })
  }, [])

  return (
    <>
      <ReactJson src={json} />
    </>
  )
}
export default () => <App />
