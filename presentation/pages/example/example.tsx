'use client'
import 'reflect-metadata'

import React from 'react'

import { useLoadExample } from '@/presentation/hooks'
import { container } from '@/inversify'
import { LoadExample } from '@/domain/usecases'
import { TYPES } from '@/inversify/types'

import { IExampleProps } from './interfaces'

const Example: React.FC<IExampleProps> = () => {
  const remoteLoadExample = container.get<LoadExample>(TYPES.LoadExample)
  const loadExample = useLoadExample(remoteLoadExample)

  const examples = React.useMemo(() => {
    if (!loadExample.data) {
      return []
    }

    return loadExample.data.results
  }, [loadExample.data])

  return (
    <div className="flex h-screen w-screen flex-col items-center gap-1 bg-white">
      <h1 className="h-screen w-1/12 bg-amber-400">Example</h1>
      {examples.map((example: any) => (
        <div key={example.url}>
          <h2>{example.name}</h2>
          <p>{example.url}</p>
        </div>
      ))}
    </div>
  )
}

export default Example
