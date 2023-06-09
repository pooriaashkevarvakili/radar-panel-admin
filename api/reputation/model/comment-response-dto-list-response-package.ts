/* tslint:disable */
/* eslint-disable */
/**
 * Accommodation Service - Accommodation Owner APIs
 * Api Documentation for Accommodation Owner Users
 *
 * The version of the OpenAPI document: Accommodation Owner
 * Contact: amir.hossein.khalouei@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { CommentResponseDto } from './comment-response-dto';

/**
 * 
 * @export
 * @interface CommentResponseDtoListResponsePackage
 */
export interface CommentResponseDtoListResponsePackage {
    /**
     * 
     * @type {string}
     * @memberof CommentResponseDtoListResponsePackage
     */
    errorMessage?: string | null;
    /**
     * 
     * @type {Array<CommentResponseDto>}
     * @memberof CommentResponseDtoListResponsePackage
     */
    result?: Array<CommentResponseDto> | null;
    /**
     * 
     * @type {boolean}
     * @memberof CommentResponseDtoListResponsePackage
     */
    success?: boolean;
}


