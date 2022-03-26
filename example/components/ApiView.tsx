import React, { FC, useState } from 'react'
import ReactJson from 'react-json-view'

import styles from './ApiView.module.css'

interface Props {
  apiCallFn: () => any
  desc: string
}
export const ApiView: FC<Props> = (props) => {
  const { apiCallFn } = props
  const [json, setJSON] = useState<any>({})
  const [collapsed, setCollapsed] = useState(true)

  return (
    <section className={styles['root']}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className={styles['space-x-2']}>
          <button
            onClick={async () => {
              const data = await apiCallFn()
              if (data) {
                setJSON(data)
                setCollapsed(false)
              }
            }}
          >
            Send
          </button>
          <button
            onClick={() => {
              setJSON({})
              setCollapsed(true)
            }}
          >
            Clear
          </button>
        </span>
        <p>{props.desc}</p>
      </div>

      <ReactJson src={json} shouldCollapse={() => collapsed}></ReactJson>
    </section>
  )
}
