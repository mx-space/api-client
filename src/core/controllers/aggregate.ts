import { IController } from '~/interfaces/controller'
import { SortOrder } from '~/interfaces/options'
import {
  AggregateRoot,
  AggregateStat,
  AggregateTop,
  TimelineData,
  TimelineType,
} from '~/models/aggregate'
import { sortOrderToNumber } from '~/utils'
import { HTTPClient } from '..'

export class AggregateController implements IController {
  base = 'aggregate'
  name = 'aggregate'
  constructor(private client: HTTPClient) {}
  private get proxy() {
    return this.client.proxy(this.base)
  }

  /**
   * 获取聚合数据
   */
  getAggregateData() {
    return this.proxy.get<AggregateRoot>()
  }

  /**
   * 获取最新发布的内容
   */
  getTop(size = 5) {
    return this.proxy.top.get<AggregateTop>({ params: { size } })
  }

  getTimeline(options?: {
    sort?: SortOrder
    type?: TimelineType
    year?: number
  }) {
    const { sort, type, year } = options || {}
    return this.proxy.timeline.get<{ data: TimelineData }>({
      params: {
        sort: sort && sortOrderToNumber(sort),
        type,
        year,
      },
    })
  }
  /**
   * 获取聚合数据统计
   */
  getStat() {
    return this.proxy.stat.get<AggregateStat>()
  }
}
