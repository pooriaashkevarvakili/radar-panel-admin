///@ts-ignore
import dayjs from 'dayjs';
///@ts-ignore
import { Module, ModuleAccessor } from 'vuex-module-accessor';
///@ts-ignore
import axios from 'axios'
// api
import {
    ///@ts-ignore
    AccommodationsApi,
    ///@ts-ignore
    CommentReportResponseDto,
    ///@ts-ignore
    CommentDetailsDto,
    ///@ts-ignore
    CommentSourceDetailsDto,
    ///@ts-ignore
    AccommodationsResponseDto
} from '~/api/reputation';
///@ts-ignore
const accommodationsApi = new AccommodationsApi();
///@ts-ignore
type SortBy = 'Date' | 'Rate';
///@ts-ignore
type SortDirection = 'ASC' | 'DESC';
///@ts-ignore
class SuperwordsState {
    report: null | CommentReportResponseDto = null;
    startDate: string | null = null;
    endDate: string;
    sortBy: SortBy = 'Date';
    sortDirection: SortDirection = 'DESC';
    searchKey: string = '';
    comments: CommentDetailsDto[] = [];
    isLoadingComments: boolean = true;
    pageIndex: number = 1;
    pageSize: number = 8;
    totalCount: number = 0;
    sourceId: number | null = null;
    rate: string | null = null;
    sources: CommentSourceDetailsDto[] = [];
    currentAccommodation: AccommodationsResponseDto | null = null;
    constructor() {
        this.endDate = dayjs().format('YYYY-MM-DD');
    }
}
///@ts-ignore
export class SuperWordsModule extends Module<SuperwordsState> {
    constructor() {
        super(SuperwordsState);
    }
    ///@ts-ignore
    set rate(v: string | null) {
        this.state.rate = v;
    }
    ///@ts-ignore
    set sourceId(v: number | null) {
        this.state.sourceId = v;
    }
    ///@ts-ignore
    set totalCount(v: number) {
        this.state.totalCount = v;
    }
    ///@ts-ignore
    set pageIndex(v: number) {
        this.state.pageIndex = v;
    }
    ///@ts-ignore
    set pageSize(v: number) {
        this.state.pageSize = v;
    }
    ///@ts-ignore
    set startDate(v: string) {
        this.state.startDate = v;
    }
    ///@ts-ignore
    set endDate(v: string) {
        this.state.endDate = v;
    }
    ///@ts-ignore
    set report(val: CommentReportResponseDto | null) {
        this.state.report = val;
    }
    ///@ts-ignore
    set sortBy(val: SortBy) {
        this.state.sortBy = val;
    }
    ///@ts-ignore
    set sortDirection(val: SortDirection) {
        this.state.sortDirection = val;
    }
    ///@ts-ignore
    set searchKey(val: string) {
        this.state.searchKey = val;
    }
    ///@ts-ignore
    set comments(val: CommentDetailsDto[]) {
        this.state.comments = val;
    }
    ///@ts-ignore
    set isLoadingComments(val: boolean) {
        this.state.isLoadingComments = val;
    }
    ///@ts-ignore
    set sources(list: CommentSourceDetailsDto[]) {
        this.state.sources = list;
    }
    ///@ts-ignore
    set currentAccommodation(val: AccommodationsResponseDto | null) {
        this.state.currentAccommodation = val;
    }
    ///@ts-ignore
    get positiveCommentsCount(): number {
        return this.state.report?.meta?.positiveCommentsCount || 0;
    }
    ///@ts-ignore
    get neutralCommentsCount(): number {
        return this.state.report?.meta?.neutralCommentsCount || 0;
    }
    ///@ts-ignore
    get negativeCommentsCount(): number {
        return this.state.report?.meta?.negativeCommentsCount || 0;
    }
    ///@ts-ignore
    get positiveCommentsPercent(): number {
        return Math.round((this.positiveCommentsCount / this.commentsCount) * 100);
    }
    ///@ts-ignore
    get neutralCommentsPercent(): number {
        return Math.round((this.neutralCommentsCount / this.commentsCount) * 100);
    }
    ///@ts-ignore
    get negativeCommentsPercent(): number {
        return Math.round((this.negativeCommentsCount / this.commentsCount) * 100);
    }
    ///@ts-ignore
    get commentsCount(): number {
        return this.state.report?.meta?.foundComments || 0;
    }
    ///@ts-ignore
    get totalCityComments(): number {
        return this.state.report?.meta?.totalCityComments || 0;
    }
    ///@ts-ignore
    get commentsPercentOfCity(): number {
        return Math.round((this.commentsCount / this.totalCityComments) * 100);
    }
    ///@ts-ignore
    get averageRate(): number {
        return this.state.report?.meta?.averageRate || 0;
    }
    ///@ts-ignore
    get currentAccommodationId(): number | null {
        return this.state.currentAccommodation?.id || null;
    }
    ///@ts-ignore
    async getWords() {
        const httpResponse = await axios.get(`https://accommodations.dev.radar361.com/api/accommodation-owner/accommodations/1814/word-cloud?from2023-02-05&to=${this.state.endDate}`);
        return httpResponse.data.result
    }
    ///@ts-ignore
    async getComments() {
        try {
            const response =
                await accommodationsApi.apiAccommodationOwnerAccommodationsIdCommentsGet(
                    {
                        ///@ts-ignore

                        id: '',
                        ///@ts-ignore
                        pageIndex: this.state.pageIndex,

                        pageSize: this.state.pageSize,

                        tDate: this.state.startDate,
                        endDate: this.state.endDate,

                        sortDirection: this.state.sortDirection,
                        sortBy: this.state.sortBy,

                        score: this.state.rate || undefined,

                        source: this.state.sourceId || undefined,

                        text: this.state.searchKey
                    }
                );

        } catch (error) {
        }
    }
}
///@ts-ignore
export default new ModuleAccessor(new SuperWordsModule(), 'superwords/');
