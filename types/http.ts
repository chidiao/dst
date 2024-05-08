import type { Server } from './servers'

export interface ResType {
  DateTime?: Date
  LastUpdate?: Date
  Count?: number
  TotalCount?: number
  PageIndex?: number
  MaxPageIndex?: number
  List?: Server[]
  Code?: number
}
