import dayjs from 'dayjs';
import { Module, ModuleAccessor } from 'vuex-module-accessor';
import axios from 'axios'
// api
import {
    AccommodationsApi,
    CommentReportResponseDto,
    CommentDetailsDto,
    CommentSourceDetailsDto,
    AccommodationsResponseDto
} from '~/api/reputation';
const accommodationsApi = new AccommodationsApi();
type SortBy = 'Date' | 'Rate';
type SortDirection = 'ASC' | 'DESC';
class KeywordState {
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
export class KeywordModule extends Module<KeywordState> {
    constructor() {
        super(KeywordState);
    }
    async getWords() {
        const httpResponse = await axios.get("https://accommodations.dev.radar361.com/api/accommodation-owner/accommodations/38/keywords");
        return httpResponse.data.result
    }
    async getComments() {
        try {
            const response =
                await accommodationsApi.apiAccommodationOwnerAccommodationsIdCommentsGet(
                    {
                        ///@ts-ignore
                        id: '',
                        pageIndex: this.state.pageIndex,
                        pageSize: this.state.pageSize,
                        startDate: this.state.startDate ?? undefined,
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

export default new ModuleAccessor(new KeywordModule(), 'keyword/');
