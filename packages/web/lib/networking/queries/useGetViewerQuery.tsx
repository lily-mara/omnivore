import { gql } from 'graphql-request'
import useSWR from 'swr'
import { publicGqlFetcher } from '../networkHelpers'

type ViewerQueryResponse = {
  viewerData?: ViewerQueryResponseData
  viewerDataError?: unknown
  isLoading: boolean
}

export type ViewerQueryResponseData = {
  me?: UserBasicData
}

export type UserBasicData = {
  id: string
  name: string
  isFullUser?: boolean
  profile: UserProfile
  email: string
  source: string
  intercomHash: string
}

export type UserProfile = {
  id: string
  username: string
  pictureUrl?: string
  bio?: string
}

export function useGetViewerQuery(): ViewerQueryResponse {
  const query = gql`
    query Viewer {
      me {
        id
        name
        isFullUser
        profile {
          id
          username
          pictureUrl
          bio
        }
        email
        source
        intercomHash
      }
    }
  `

  const { data, error } = useSWR(query, publicGqlFetcher)

  return {
    viewerData: data as ViewerQueryResponseData,
    viewerDataError: error, // TODO: figure out error possibilities
    isLoading: !error && !data,
  }
}
