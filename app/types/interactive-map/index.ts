export type MapPinKind =
  | 'landmark'
  | 'session'

export type MapPinVisibility = 'public' | 'private'

export interface MapPinData {
  id: string
  kind: MapPinKind
  name: string
  x: number
  y: number
  description?: string
  imageUrl?: string
  documentUrl?: string
  tags?: string[]
  visibility: MapPinVisibility
  createdAt: string
  updatedAt: string
}

export interface MapConfig {
  id: string
  name: string
  width: number
  height: number
  minZoom: number
  maxZoom: number
  tileSize: number
}
