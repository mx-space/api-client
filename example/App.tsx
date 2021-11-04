import axios from 'axios'
import React, { useEffect } from 'react'
import ReactJson from 'react-json-view'
import { createClient } from '~/core/client'
import { PostController } from '~/core/controllers'
// use the component in your app!

function App() {
  return (
    <div className="App">
      <p>Post List</p>
      <PostPayload1 />

      <p>Latest Post</p>
      <PostPayload2 />
    </div>
  )
}

function PostPayload1() {
  const [json, setJson] = React.useState<any>({})
  useEffect(() => {
    // for test
    const client = createClient(axios)('https://api.innei.ren/v2')

    client.injectControllers(PostController)

    client.post
      .getPost('website', 'host-an-entire-Mix-Space-using-Docker')
      .then((res) => {
        setJson(res)
      })
  }, [])

  return (
    <>
      <ReactJson src={json} collapsed />
    </>
  )
}

function PostPayload2() {
  const [json, setJson] = React.useState<any>({})
  useEffect(() => {
    // for test
    const client = createClient(axios)('https://api.innei.ren/v2')

    client.injectControllers(PostController)

    client.post
      .getLatest()

      .then((res) => {
        setJson(res)
      })
  }, [])

  return (
    <>
      <ReactJson src={json} collapsed />
    </>
  )
}

export default () => <App />
