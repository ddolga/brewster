import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    BrewlogDetailDto,
    BrewlogSummaryDto,
    CreateBrewlogDto, TemplateBrewlogDto,
    UpdateBrewlogDto
} from "../../types/dto/brewlog.dto.ts";
import {createBrewlogSchema, detailBrewlogSchema, summaryBrewlogSchema, templateBrewlogSchema} from "brewster-types";


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
                const boo = summaryBrewlogSchema.array().parse(response);
                return boo;
            },
        }),
        getBrewlogDetail: build.query({
            query: (args: {
                id: string
            }) => ({
                url: `/${args.id}`
            }),
            providesTags:['Brewlog'],
            transformResponse: (response: BrewlogDetailDto) => {
                return detailBrewlogSchema.parse(response);
            }
        }),
        getBrewlogNewTemplate: build.query({
            query: (args: {
                id: string
            }) => ({
                url: `/new/${args.id}`
            }),
            transformResponse: (response: CreateBrewlogDto) => {
                return createBrewlogSchema.parse(response);
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
    useGetBrewlogDetailQuery,
    useGetBrewlogNewTemplateQuery,
    useCreateNewEntryMutation,
    useUpdateEntryMutation,
    useDeleteEntryMutation,
} = brewlogApi;

export default brewlogApi;
