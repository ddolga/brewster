import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    BrewlogSummaryDto,
    brewlogSummarySchema,
    CreateBrewlogDto,
    UpdateBrewlogDto
} from "../../types/dto/brewlog.dto.ts";


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
                const boo = brewlogSummarySchema.array().parse(response);
                return boo;
            },
        }),
        getBrewlogEntry: build.query({
            query: (args: {
                id: string
            }) => ({
                url: `/${args.id}`
            }),
            providesTags:['Brewlog'],
            transformResponse: (response: BrewlogSummaryDto) => {
                return brewlogSummarySchema.parse(response) as BrewlogSummaryDto;
            }
        }),
        getBrewlogNewTemplate: build.query({
            query: (args: {
                id: string
            }) => ({
                url: `/new/${args.id}`
            }),
            transformResponse: (response: BrewlogSummaryDto) => {
                return brewlogSummarySchema.omit({_id:true}).parse(response);
            },
        }),
        createNewEntry: build.mutation({
            query(entry: CreateBrewlogDto) {
                return {
                    url: '',
                    method: 'POST',
                    body: entry
                }
            },
            invalidatesTags: ['Brewlog']
        }),
        updateEntry: build.mutation({
            query(entry: UpdateBrewlogDto) {
                return {
                    url: '',
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
    useGetBrewlogNewTemplateQuery,
    useCreateNewEntryMutation,
    useUpdateEntryMutation,
    useDeleteEntryMutation,
} = brewlogApi;

export default brewlogApi;
