import { AggregateController } from '~/core'
import { mockRequestInstance } from '~/__tests__/helpers/instance'
import { mockResponse } from '~/__tests__/helpers/response'

describe('test  aggregate controller', () => {
  const client = mockRequestInstance(AggregateController)
  test('get /aggregate', async () => {
    const mocked = mockResponse(
      '/aggregate',
      // https://api.innei.ren/v2/aggregate

      {
        user: {
          id: '5ea4fe632507ba128f4c938c',
          introduce: '这是我的小世界呀',
          mail: 'i@innei.ren',
          url: 'https://innei.ren',
          name: 'Innei',
          social_ids: {
            bili_id: 26578164,
            netease_id: 84302804,
            github: 'Innei',
          },
          username: 'Innei',
          created: '2020-04-26T03:22:11.784Z',
          modified: '2020-11-13T09:38:49.014Z',
          last_login_time: '2021-11-10T04:47:09.329Z',
          avatar: 'https://cdn.innei.ren/avatar.png',
        },
        seo: {
          title: '静かな森',
          description: '致虚极，守静笃。',
          keywords: ['blog', 'mx-space', 'space', '静かな森'],
        },
        categories: [
          {
            id: '5eb2c62a613a5ab0642f1f7a',
            type: 0,
            count: 34,
            name: '编程',
            slug: 'programming',
            created: '2020-05-06T14:14:02.339Z',
          },
          {
            id: '5eb2c62a613a5ab0642f1f7b',
            type: 0,
            count: 19,
            name: '折腾',
            slug: 'Z-Turn',
            created: '2020-05-06T14:14:02.356Z',
          },
          {
            id: '5eb2c62a613a5ab0642f1f7c',
            type: 0,
            count: 18,
            name: '学习',
            slug: 'learning-process',
            created: '2020-05-06T14:14:02.364Z',
          },
          {
            id: '5eb2c62a613a5ab0642f1f7e',
            type: 0,
            count: 11,
            name: '技术',
            slug: 'technology',
            created: '2020-05-06T14:14:02.375Z',
          },
          {
            id: '5ed09730a0a8f94af569c96c',
            type: 0,
            count: 9,
            slug: 'website',
            name: '站点日志',
            created: '2020-05-29T05:01:36.315Z',
          },
          {
            id: '5ed5be418f3d6b6cb9ab7700',
            type: 0,
            count: 2,
            slug: 'reprinta',
            name: '转载',
            created: '2020-06-02T02:49:37.424Z',
          },
        ],
        page_meta: [
          {
            id: '5e0318319332d06503619337',
            title: '自述',
            slug: 'about',
            order: 1,
          },
          {
            id: '5ea52aafa27a8a01dee55f53',
            order: 1,
            title: '栈',
            slug: 'stack',
          },
          {
            id: '5eb3b6e032c759467b0ad71e',
            order: 0,
            title: '历史',
            slug: 'history',
          },
          {
            id: '5eb54fc06c9cc86c3692349f',
            order: 0,
            title: '留言',
            slug: 'message',
          },
          {
            id: '5f0aaeeaddf2006d12773b12',
            order: 0,
            title: '此站点',
            slug: 'about-site',
          },
          {
            id: '601bce41a0630165aa48b9d0',
            order: 0,
            title: '迭代',
            slug: 'sprint',
          },
        ],
        lastest_note_nid: 104,
      },
    )
    const data = await client.aggregate.getAggregateData()
    expect(data.raw.data).toEqual(mocked)
    expect(data.user.name).toEqual(mocked.user.name)
    expect(data.lastestNoteNid).toEqual(mocked.lastest_note_nid)
  })
})
