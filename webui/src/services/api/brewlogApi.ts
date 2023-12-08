import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BrewlogCreateDto, brewlogSummarySchema, BrewlogUpdateDto} from "../dto/brewlog.dto.ts";


const brewlogApi = createApi({
    reducerPath: 'brewlog',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/brewlogs'
    }),
    tagTypes: ['Brewlog'],
    endpoints: (build) => ({
        getBrewlogs: build.query({
            query: () => ({url: ''}),
            providesTags: ['Brewlog'],
            transformResponse: (response) => {
                return brewlogSummarySchema.array().parse(response);
            }
        }),
        getBrewlogEntry: build.query({
            query: (args: { id: string }) => ({
                url: `/${args.id}`
            }),
            transformResponse: (response) => {
                return brewlogSummarySchema.parse(response);
            }
        }),
        createNewEntry: build.mutation({
            query(entry: BrewlogCreateDto) {
                return {
                    url: '',
                    method: 'POST',
                    body: entry
                }
            },
            invalidatesTags: ['Brewlog']
        }),
        updateEntry: build.mutation({
            query(entry: BrewlogUpdateDto) {
                return {
                    url:'',
                    method: 'PATCH',
                    body: entry
                }
            },
            invalidatesTags: ['Brewlog']
        }),
        deleteEntry: build.mutation({
            query(id: string) {
                return {
                    url: `/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Brewlog']
        })
    })
})

export const {
    useGetBrewlogsQuery,
    useGetBrewlogEntryQuery,
    useCreateNewEntryMutation,
    useUpdateEntryMutation,
    useDeleteEntryMutation,
} = brewlogApi;

export default brewlogApi;
