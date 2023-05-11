'use client'

import 'reflect-metadata'

import React from 'react'

import { container } from '@/inversify'
import { LoadSimplesOne } from '@/domain/usecases'
import { TYPES } from '@/inversify/types'
import { useLoadSimplesOne } from '@/presentation/hooks'
import { Button, buttonVariants } from '@/presentation/components/atoms/button/button'
import { cn } from '@/lib/utils'
import { PostCreateButton } from '@/presentation/components/molecules/post-create-button'

import { ISimplesOneProps } from './interfaces'

const SimpleOne: React.FC<ISimplesOneProps> = () => {
  const remoteLoadSimplesOne = container.get<LoadSimplesOne>(TYPES.LoadSimplesOne)
  const loadSimplesOne = useLoadSimplesOne(remoteLoadSimplesOne)

  const data = React.useMemo(() => {
    if (!loadSimplesOne.data) {
      return []
    }

    return loadSimplesOne.data.results
  }, [loadSimplesOne.data])

  return (
    <div className="flex h-screen w-screen flex-col items-center gap-1 bg-white">
      <h1 className="h-screen w-1/12 bg-amber-400">SimplesOne</h1>
      {data.map((item: any) => (
        <div key={item.url}>
          <h2>{item.name}</h2>
          <p>{item.url}</p>
        </div>
      ))}
      <Button>PESQUISAR</Button>
      <Button>Botão</Button>
      <Button variant="outline">Outline</Button>
      {/* <ButtonFN>teste</ButtonFN> */}
      <PostCreateButton />

      {/* <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack> */}
    </div>
  )
}

export default SimpleOne
