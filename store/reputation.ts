import dayjs from 'dayjs';
import { Module, ModuleAccessor, mutation } from 'vuex-module-accessor';

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

class ReputationState {
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

export class ReputationModule extends Module<ReputationState> {
	constructor() {
		super(ReputationState);
	}

	set rate(v: string | null) {
		this.state.rate = v;
	}

	set sourceId(v: number | null) {
		this.state.sourceId = v;
	}

	set totalCount(v: number) {
		this.state.totalCount = v;
	}

	set pageIndex(v: number) {
		this.state.pageIndex = v;
	}

	set pageSize(v: number) {
		this.state.pageSize = v;
	}

	set startDate(v: string) {
		this.state.startDate = v;
	}

	set endDate(v: string) {
		this.state.endDate = v;
	}

	set report(val: CommentReportResponseDto | null) {
		this.state.report = val;
	}

	set sortBy(val: SortBy) {
		this.state.sortBy = val;
	}

	set sortDirection(val: SortDirection) {
		this.state.sortDirection = val;
	}

	set searchKey(val: string) {
		this.state.searchKey = val;
	}

	set comments(val: CommentDetailsDto[]) {
		this.state.comments = val;
	}

	set isLoadingComments(val: boolean) {
		this.state.isLoadingComments = val;
	}

	set sources(list: CommentSourceDetailsDto[]) {
		this.state.sources = list;
	}

	set currentAccommodation(val: AccommodationsResponseDto | null) {
		this.state.currentAccommodation = val;
	}

	get positiveCommentsCount(): number {
		return this.state.report?.meta?.positiveCommentsCount || 0;
	}

	get neutralCommentsCount(): number {
		return this.state.report?.meta?.neutralCommentsCount || 0;
	}

	get negativeCommentsCount(): number {
		return this.state.report?.meta?.negativeCommentsCount || 0;
	}

	get positiveCommentsPercent(): number {
		return Math.round((this.positiveCommentsCount / this.commentsCount) * 100);
	}

	get neutralCommentsPercent(): number {
		return Math.round((this.neutralCommentsCount / this.commentsCount) * 100);
	}

	get negativeCommentsPercent(): number {
		return Math.round((this.negativeCommentsCount / this.commentsCount) * 100);
	}

	get commentsCount(): number {
		return this.state.report?.meta?.foundComments || 0;
	}

	get totalCityComments(): number {
		return this.state.report?.meta?.totalCityComments || 0;
	}

	get commentsPercentOfCity(): number {
		return Math.round((this.commentsCount / this.totalCityComments) * 100);
	}

	get averageRate(): number {
		return this.state.report?.meta?.averageRate || 0;
	}

	get currentAccommodationId(): number | null {
		return this.state.currentAccommodation?.id || null;
	}

	async getAccommodation() {
		try {
			const response =
				await accommodationsApi.apiAccommodationOwnerAccommodationsGet();
			this.currentAccommodation = response.data.result?.[0] || null;
		} catch (error) {}
	}

	async getReport() {
		if (!this.currentAccommodationId) return;
		try {
			const response =
				await accommodationsApi.apiAccommodationOwnerAccommodationsIdCommentsReportGet(
					{
						id: this.currentAccommodationId,
						startDate: this.state.startDate ?? undefined,
						endDate: this.state.endDate
					}
				);
			this.report = response.data.result || null;
		} catch (error) {}
	}

	async getComments() {
		if (!this.currentAccommodationId) return;
		this.isLoadingComments = true;
		try {
			const response =
				await accommodationsApi.apiAccommodationOwnerAccommodationsIdCommentsGet(
					{
						id: this.currentAccommodationId,
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
			this.comments = response.data.result?.items || [];
			this.totalCount = response.data.result?.totalCount || 0;
		} catch (error) {
		} finally {
			this.isLoadingComments = false;
		}
	}

	async getSources() {
		if (!this.currentAccommodationId) return;
		try {
			const response =
				await accommodationsApi.apiAccommodationOwnerAccommodationsIdCommentSourcesGet(
					{
						id: this.currentAccommodationId
					}
				);
			this.sources = response.data.result || [];
		} catch (error) {}
	}
}

export default new ModuleAccessor(new ReputationModule(), 'reputation/');
