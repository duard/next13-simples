'use client'
import React from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { LoadSimplesOne } from '@/domain/usecases'

interface IUseLoadSimplesOneResult extends Pick<UseQueryResult<LoadSimplesOne.Model>, 'data' | 'isLoading' | 'error'> {
  page: number
  setPage: (page: number) => void
  size: number
  setSize: (size: number) => void
  total: number
  total_pages: number
}

export const useLoadSimplesOneKey = 'use-load-simples-one'

export const useLoadSimplesOne = (remoteLoadSimplesOne: LoadSimplesOne): IUseLoadSimplesOneResult => {
  const [page, setPage] = React.useState(1)
  const [size, setSize] = React.useState(10)

  const { data, isLoading, error } = useQuery([useLoadSimplesOneKey, page, size], async () => {
    return await remoteLoadSimplesOne.execute({ page, size })
  })

  const total = React.useMemo(() => {
    if (!data) {
      return 0
    }

    return data.count
  }, [data])

  const total_pages = React.useMemo(() => {
    if (!data) {
      return 0
    }

    return data.count / size
  }, [data, size])

  return {
    data,
    isLoading,
    error,
    page,
    setPage,
    size,
    setSize,
    total,
    total_pages,
  }
}
