import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BrewlogSummaryDto, brewlogSummarySchema, CreateBrewlogDto, UpdateBrewlogDto} from "../dto/brewlog.dto.ts";
import {createBrewlogSchema} from "brewster-types";


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
            query: (args: {
                id: string
            }) => ({
                url: `/${args.id}`
            }),
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
                return createBrewlogSchema.parse(response) as CreateBrewlogDto;
            }
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
