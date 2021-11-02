import axios from 'axios'
import { createClient } from '~/core/client'
import { PostClient } from '~/core/clients/post'

// for test
const client = createClient(axios)('https://api.innei.ren/v2')
const code = document.querySelector('#json')
client.injectClients(PostClient)

client.post.getPosts().then((res) => {
  console.log(res)

  code!.innerHTML = JSON.stringify(res, null, 2)
})

client.post
  .getPost('website', 'host-an-entire-Mix-Space-using-Docker')
  .then((res) => {
    console.log(res)
  })
