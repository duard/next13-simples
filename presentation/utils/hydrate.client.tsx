'use client'

import React from 'react'
import { Hydrate as RQHydrate, HydrateProps } from '@tanstack/react-query'

const Hydrate: React.FC<HydrateProps> = (props) => {
  return <RQHydrate {...props} />
}

export default Hydrate
